import React from 'react';
import { Redirect } from 'react-router';
import { Typography, Button, Grid, Paper, RadioGroup, Radio, Divider, FormControlLabel, Checkbox, TextField, FormGroup, Card, CardHeader, Avatar, IconButton, Input, FormLabel, FormControl } from '@material-ui/core';
import { Sessions } from 'alta-jsapi';

import { Forms } from './formRequests';

import { GetQueryComponent } from './Respond';
import { Field } from '../../dashboardModules/core/common';
import CardBody from '../../components/Card/CardBody';
import { ModuleWrapper } from '../../dashboardModules/core/common';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ProfileCard, useProfilePicture } from '../../util/social';

function Section({children, color})
{
    return <ModuleWrapper style={{ width: '100%' }}>
            <CardBody>
                {children}
            </CardBody>
        </ModuleWrapper>;
}

const PermissionType =
{
    Edit : 1 << 0,
    Respond : 1 << 1,
    ViewResponses : 1 << 2,
    ViewComments : 1 << 3,
    ViewHiddenComments : 1 << 4,
    Comment : 1 << 5,
    Resolve : 1 << 6,
    Unresolve : 1 << 7
}

var minDate = new Date(1900, 0);

function Resolve({form, response, sendResolve})
{    
    var isReopen = new Date(response.resolved) > minDate;
    var action = isReopen ? PermissionType.Unresolve : PermissionType.Resolve; 

    if ((response.permissions & action) == 0)
    {
        return null;
    }

    var text = isReopen ? "Reopen" : "Resolve";

    return <Section>
        <Typography variant="h6" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>{text}</Typography>
        <Button onClick={() => sendResolve({resolved: !isReopen})}>{text}</Button>
    </Section>;
}


function Comments({form, response, sendComment})
{    
    var canSeeComments = (response.permissions & PermissionType.ViewComments) != 0;
    var canComment = (response.permissions & PermissionType.Comment) != 0;
    
    if (!canSeeComments && !canComment)
    {
        return null;
    }

    return <Section>
        <Typography variant="h6" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>Comments</Typography>
        {!response.comments ? <p>"No comments"</p> : response.comments.map((comment, index) => <Comment key={index} {...comment}/>)}
        <br/>
        {canComment ? <>
            <NewComment send={sendComment}/>
            <br/>
        </> : null}
    </Section>;
}

function Comment({userId, username, date, comment, hidden })
{
    var classes = {};

    var pfp = useProfilePicture(userId);

    return <Card className={classes.root}>
        <CardHeader
        avatar={<Avatar src={pfp}/>   }
        action={
            <IconButton aria-label="settings">
            <MoreVertIcon />
            </IconButton>
        }
        title={username + (hidden ? ' (HIDDEN)' : '')}
        subheader={new Date(date).toUTCString()}
        />
        <CardBody style={{paddingTop:0}}>
            {comment}
        </CardBody>
    </Card>
}


function NewComment({send})
{
    var [comment, setComment] = React.useState('');
    var [hidden, setHidden] = React.useState(false);

    var userId = Sessions.getUserId();
    var username = Sessions.getUsername(); 
    
    var pfp = useProfilePicture(userId);

    function onSubmit(e)
    {
        e.preventDefault();
        
        send({comment, hidden});
        setComment('');
    }

    return <form style={{display:'flex', flexDirection:'row', width:'100%'}} onSubmit={onSubmit}>
            <Avatar style={{marginRight:'10px'}} src={pfp}/>
            <div style={{flexGrow:1}}>
                <Input multiline variant='filled' fullWidth  value={comment} onChange={e => setComment(e.target.value)}/>
            
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <FormControlLabel label='Hidden' control={<Checkbox checked={hidden} onChange={e => setHidden(e.target.checked)}/>}/>
                    <Button type='submit'>Add Comment</Button>
                </div>
            </div>
    </form>;
}

function ResponseInfo({form, response})
{
    return <Section>
        <Typography variant="h6" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>Submission Info</Typography>
        <ProfileCard userId={response.userId} username={response.username}/>
        <br/>
        <Field label="Form">{form.title}</Field>
        <Field label="Form ID">{response.formId}</Field>
        <Field label="Submission">{new Date(response.submitted).toUTCString()}</Field>
    </Section>;
}

function UserResponses({username, userId, formId, current})
{
    var [responses, setResponses] = React.useState();
    var [error, setError] = React.useState();

    React.useEffect(() =>
    {
        Forms.getUserResponses(userId, formId)
        .then(setResponses)
        .catch(setError);
    },
    [userId, formId]);

    return <Section>
        <Typography variant="h6" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>From {username}</Typography>
        <Typography variant="subtitle1">{!responses ? "Searching..." : `${responses.length} found`}</Typography>

        <br/>
        {!responses ? null : responses.map(item => <Button key={item.id} disabled={current == item.id} href={item.id}>{new Date(item.submitted).toUTCString()}</Button>)}
    </Section>;
}

export default function Response(props)
{
    var id = props.match.params.formId;
    var responseId = props.match.params.responseId;

    var [form, setForm] = React.useState();
    var [response, setResponse] = React.useState();
    var [error, setError] = React.useState();
    
    var [page, setPage] = React.useState(0);

    function submitResponse() 
    {
        if (page == response.responsePages.length - 1)
        {        
        }
        else
        {
            setPage(old => old + 1);
        }
    }

    function sendComment({comment, hidden})
    {
        Forms.comment(id, responseId, comment, hidden)
        .then(response =>
        {
            setResponse(response);
        })
        .catch(console.error);
    }
    
    function sendResolve({resolved, comment})
    {
        Forms.resolve(id, responseId, resolved, comment)
        .then(response =>
        {
            setResponse(response);
        })
        .catch(console.error);
    }

    React.useEffect(() => 
    { 
        setResponse(undefined);

        Forms.getForm(id).then(form =>
        {
            setForm(form);
            setError(undefined);

            Forms.getResponse(id, responseId).then(response =>
            {
                setResponse(response);
                setError(undefined);
            
                setPage(0);
            })
            .catch(setError);

        }).catch(setError) 
    }, [id]);

    if (!response)
    {
        if (!!error && error.statusCode == 404)
        {
            return <Redirect to='/not_found'/>;
        }

        return <div>{!!error ? JSON.stringify(error) : "Loading..."}</div>
    }

    var formPage = form.pages.find(item => item.id == response.pageResponses[page].id);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            spacing="3"
            style={{ maxWidth:'1200px', marginLeft:'auto', marginRight:'auto'}}
        >
            <Grid item xs={12} sm={8}>
                <div>
                    <Page responsePage={response.pageResponses[page]} formPage={formPage} isLast={page == response.pageResponses.length - 1} onSubmit={submitResponse} />
                </div>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Grid item>
                    <ResponseInfo form={form} response={response}/>
                </Grid>
                <Grid item>
                    <UserResponses username={response.username} userId={response.userId} formId={id} current={response.id}/>
                </Grid>
                <Grid item>
                    <Comments form={form} response={response} sendComment={sendComment}/>
                </Grid>
                <Grid item>
                    <Resolve form={form} response={response} sendResolve={sendResolve}/>
                </Grid>
            </Grid>
        </Grid>);
}

function Page({ responsePage, formPage, isLast, onSubmit })
{
    function submit()
    {
        onSubmit();
    }

    return <div>
            <Grid>
                {responsePage.queryResponses.map((query, i) => <Query key={i} index={i} responseQuery={query} formQuery={formPage.queries.find(item => item.id == query.id)}/>)}
            </Grid>
            
            {isLast ? null : 
            <Grid>
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" color="primary" onClick={submit}>Next</Button>
                </div>
                <br/>
                <br/>
            </Grid>}
        </div>;
}

function Query({index, formQuery, responseQuery})
{
    var Component = GetQueryComponent(formQuery.type);

    return (
    <ModuleWrapper>
        <div>
            <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '15px',
        paddingTop: '15px',
        paddingBottom: '1em'
            }}>
                <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{index + 1}. {formQuery.title}</Typography>
                <Typography variant="subtitle2" style={{ marginLeft: '0px', marginBottom:'10px' }}>{formQuery.description}</Typography>

                {!!formQuery.image ? (
                    <div>
                        <img src={formQuery.image} width="80%" height="auto" /><br></br><br></br>
                    </div>
                ) : ""}

                <Component query={formQuery} values={responseQuery.values} disabled/>
            </div>  
        </div>
    </ModuleWrapper>);
}