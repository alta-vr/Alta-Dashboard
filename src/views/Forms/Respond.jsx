import React from 'react';
import { Redirect } from 'react-router';
import { Typography, Button, Grid, Paper, RadioGroup, Radio, Divider, FormControlLabel, Checkbox, TextField, FormGroup } from '@material-ui/core';
import { Sessions } from 'alta-jsapi';

import { Forms } from './formRequests';

export default function Respond(props)
{
    var id = props.match.params.formId;

    var [form, setForm] = React.useState();
    var [error, setError] = React.useState();

    var [isSubmitted, setSubmitted] = React.useState();

    var [page, setPage] = React.useState(0);

    var [data, setData] = React.useState([]);

    React.useEffect(() => { Forms.getForm(id).then(form =>
        {
            setForm(form);
            setData([]);
            setSubmitted(false);
            setError(undefined);
        }).catch(setError) }, [id]);

    if (!form)
    {
        if (!!error && error.statusCode == 404)
        {
            return <Redirect to='/not_found'/>;
        }

        return <div>{!!error ? JSON.stringify(error) : "Loading..."}</div>
    }

    function submitResponse(newData) 
    {
        var result;

        setData(oldData => result = [...oldData, newData]);

        if (page == form.pages.length - 1)
        {        
            Forms.submit(id, result)
            .then(console.log)
            .catch(console.error);

            setSubmitted(true); 
        }
        else
        {
            setPage(old => old + 1);
        }
    }

    function reloadForAnotherResponse() { }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={5} style={{ width: '100%' }}>
                <Grid style={{ borderTop: '10px solid teal', borderRadius: 10 }}>
                    <div>
                        <div>
                            <Paper elevation={2} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                                    <Typography variant="h4" style={{ fontFamily: 'sans-serif Roboto', marginBottom: "15px" }}>
                                        {form.title}
                                    </Typography>
                                    <Typography variant="subtitle1">{form.description}</Typography>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </Grid>

                {!isSubmitted ? (
                    <div>
                    <Page page={form.pages[page]} isLast={page == form.pages.length - 1} onSubmit={submitResponse} />
                </div>
                ) :
                    (
                        <div>
                            <br/>
                            <Paper elevation={2} style={{ width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    marginLeft: '15px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px'
                                }}>
                                    <Typography variant="body1">Form submitted</Typography>
                                    <Typography variant="body2">{form.completionText}</Typography>

                                    {form.allowMultiple ? <Button onClick={reloadForAnotherResponse}>Submit another response</Button> : null}
                                </div>
                            </Paper>
                        </div>
                    )
                }
            </Grid>
        </Grid>);
}

function Page({ page, isLast, onSubmit })
{
    var [data, setData] = React.useState({});

    function valueChanged(id, newValues)
    {
        setData(oldData => ({...oldData, [id]:newValues}));
    }

    function submit()
    {
        var responses = [];

        for (const [key, value] of Object.entries(data))
        {
            responses.push({id: key, values: value});
        }

        onSubmit({ id : page.id, queryResponses: responses});
    }

    return <div>
            <Grid>
                {page.queries.map((query, i) => <Query key={i} index={i} query={query} onChange={newValues => valueChanged(query.id, newValues)} values={data[query.id]}/>)}
            </Grid>
            
            <Grid>
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" color="primary" onClick={submit}>
                        {isLast ? "Submit" : "Next" }
                    </Button>
                </div>
                <br/>
                <br/>
            </Grid>
        </div>;
}

function Query({index, query, values, onChange})
{
    values = values || (query.default == null ? [] : [ query.default ]);

    var Component = GetQueryComponent(query.type);

    return (
    <div style={{ paddingBottom: '1em' }}>
        <Paper>
            <div>
                <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '15px',
            paddingTop: '15px',
            paddingBottom: '15px'
                }}>
                    <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{index + 1}. {query.title}</Typography>
                    <Typography variant="subtitle2" style={{ marginLeft: '0px', marginBottom:'10px' }}>{query.description}</Typography>

                    {!!query.image ? (
                        <div>
                            <img src={query.image} width="80%" height="auto" /><br></br><br></br>
                        </div>
                    ) : ""}

                    <Component query={query} values={values} onChange={onChange}/>
                </div>  
            </div>
        </Paper>
    </div>);
}

export function GetQueryComponent(type)
{
    switch (type)
    {
        case 'Choice': return Choice;
        case 'Boolean': return Boolean;
        case 'List' : return List;
        case 'Multichoice': return Multichoice;
        case 'Number': return Number;
        case 'Paragraph': return Paragraph;
        case 'Rating': return Rating;
        case 'Text': return Text;
        default: return Unknown;
    }
}

function Unknown({query})
{
    return <div>Unknown query type {query.type}</div>;
}

function Choice({query, values, onChange, disabled})
{
    function handleRadioChange(e) 
    {
        onChange([ e.target.value ]);
    }

    return <div>
        <RadioGroup aria-label="quiz" name="quiz" value={values[0] || -1} onChange={handleRadioChange}>
            {query.options.map((op) => <RadioItem key={op.id} option={op} radio disabled={disabled}/>)}
        </RadioGroup>
    </div>
}

function RadioItem({option, radio, ...radioProps})
{
    return <div key={option.id}>
        <div style={{ display: 'flex', marginLeft: '7px' }}>
            <FormControlLabel {...radioProps} value={option.id.toString()} control={radio ? <Radio /> : <Checkbox/>} label={option.value} />
        </div>

        <div style={{ display: 'flex', marginLeft: '10px' }}>
            {!!option.image ? (
                <img src={option.image} width="64%" height="auto" />
            ) : ""}
            <Divider />
        </div>
    </div>
}

function Boolean({query, values, onChange, disabled})
{
    function handleChange(e)
    {
        onChange([e.target.checked.toString()]);
    }

    return <div>
        <Checkbox checked={values[0] == 'true'} onChange={handleChange} disabled={disabled}/>
    </div>;
}

function List({query, values, onChange, disabled})
{
    function handleChange(e, i)
    {
        var newValues = [...values];
        
        var value = e.target.value;
        var max = query.maxLength || 50;

        if (value.length > max)
        {
            value = value.substring(0, max);
        }

        newValues[i] = value;

        if (!!e.target.value && i < values.length - 1)
        {
            newValues.splice(i, 1);
        }

        onChange(newValues);
    }

    function add()
    {
        onChange([...values, '']);
    }

    return <div>
        {values.map((item, i) => <TextField value={item} onChange={e => handleChange(e, i)} disabled={disabled}/>)}
        <Button disabled={disabled || values.includes(' ') || values.length >= 50} onClick={add}>Add</Button>
    </div>;
}

function Multichoice({query, values, onChange, disabled})
{
    function handleChange(e, id) 
    {
        id = id.toString();

        if (e.target.checked)
        {
            if (!values.includes(id))
            {
                onChange([...values, id]);
            }
        }
        else
        {
            var index = values.indexOf(id);

            if (index >= 0)
            {
                var newValues = [...values];

                newValues.splice(index, 1);

                onChange(newValues);
            }
        }
    }

    return <div>
        <FormGroup aria-label="quiz" name="quiz" value={values[0] || -1}>
            {query.options.map((op) => <RadioItem key={op.id} option={op} checked={values.includes(op.id.toString())} onChange={e => handleChange(e, op.id)} disabled={disabled}/>)}
        </FormGroup>
    </div>
}

function Number({query, values, onChange, disabled})
{
    function handleChange(e)
    {
        onChange([e.target.value.toString()]);
    }

    return <div>
        <TextField type={'number'} value={parseFloat(values[0])} onChange={handleChange} disabled={disabled}/>
    </div>;
}

function Paragraph({query, values, onChange, disabled})
{
    function handleChange(e)
    {
        var value = e.target.value;
        var max = query.maxLength || 500;

        if (value.length > max)
        {
            value = value.substring(0, max);
        }

        onChange([value]);
    }

    return <div>
        <TextField multiline value={values[0]} rows={2} rowsMax={10} onChange={handleChange} disabled={disabled}/>
    </div>;
}

function Rating({query, values, onChange, disabled})
{
    function handleChange(i)
    {
        onChange([i.toString()]);
    }

    var count = query.options.length == 0 ? 5 : Math.max(...query.options.map(item => item.id));
    
    var temp = new Array(count);
    temp.fill(0);

    return <div>
        {temp.map((item, i) => <Checkbox checked={parseInt(values[0]) > i} onChange={() => handleChange(i + 1)} disabled={disabled}/>)}
    </div>;
}

function Text({query, values, onChange, disabled})
{
    function handleChange(e)
    {
        var value = e.target.value;
        var max = query.maxLength || 50;

        if (value.length > max)
        {
            value = value.substring(0, max);
        }

        onChange([value]);
    }

    return <div>
        <TextField value={values[0]} onChange={handleChange} disabled={disabled}/>
    </div>;
}