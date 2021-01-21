import React from 'react';
import { Redirect } from 'react-router';
import { Typography, Button, Grid, Paper, RadioGroup, Radio, Divider, FormControlLabel, Checkbox, TextField, FormGroup } from '@material-ui/core';
import { Sessions } from 'alta-jsapi';

import { Forms } from './formRequests';
import { number } from 'prop-types';

import { BarChart, XAxis, YAxis, Bar } from 'recharts';

export default function Response(props)
{
    var id = props.match.params.formId;

    var [form, setForm] = React.useState();
    var [responses, setResponses] = React.useState();
    var [error, setError] = React.useState();
    
    var [page, setPage] = React.useState(0);

    function submitResponse() 
    {
        if (page == responses.length - 1)
        {        
        }
        else
        {
            setPage(old => old + 1);
        }
    }

    React.useEffect(() => 
    { 
        setResponses(undefined);

        Forms.getForm(id).then(async form =>
        {
            setForm(form);
            setError(undefined);

            var responses = [];

            for await (var result of Forms.getResponses(id, true))
            {
                responses = [...responses, ...result];
            }

            var newValue = [];

            var nextPageIndex = new Array(responses.length);
            
            for (var i = 0; i < nextPageIndex.length; i++)
            {
                nextPageIndex[i] = responses[i].pageResponses.length > 0 ? 0 : -1;
            }

            while (nextPageIndex.some(item => item >= 0))
            {                
                var min = Math.min(...nextPageIndex.filter(index => index >= 0).map((index, i) => responses[i].pageResponses[index].id));

                var results = [];
                
                for (var query of form.pages[min].queries)
                {
                    results.push({ id: query.id, results: [] });
                }

                for (var i = 0; i < responses.length; i++)
                {
                    if (nextPageIndex[i] < 0)
                    {
                        continue;
                    }

                    var nextPage = responses[i].pageResponses[nextPageIndex[i]];

                    if (nextPage.id == min)
                    {   
                        for (var queryIndex in form.pages[min].queries)
                        {
                            var query = form.pages[min].queries[queryIndex];

                            var response = nextPage.queryResponses.find(item => item.id == query.id);
                            var values = !!response ? response.values : query.default;

                            if (!!values)
                            {
                                results[queryIndex].results.push({responseId: responses[i].id, values });
                            }
                        }
                        
                        if (nextPageIndex[i] + 1 < responses[i].pageResponses.length)
                        {
                            nextPageIndex[i]++;
                        }
                        else
                        {
                            nextPageIndex[i] = -1;
                        }
                    }
                }

                newValue.push({id: min, results});
            }

            setResponses(newValue);
            setError(undefined);
        
            setPage(0);

        }).catch(setError) 
    }, [id]);

    if (!responses)
    {
        if (!!error && error.statusCode == 404)
        {
            return <Redirect to='/not_found'/>;
        }

        if (!!error)
            console.error(error);

        return <div>{!!error ? JSON.stringify(error) : "Loading..."}</div>
    }

    var formPage = form.pages.find(item => item.id == responses[page].id);
    
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

                                    <br/>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </Grid>
                <div>
                    <Page responsePage={responses[page]} formPage={formPage} isLast={page == responses.length - 1} onSubmit={submitResponse} />
                </div>
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
                {responsePage.results.map((query, i) => <Query key={i} index={i} responseQuery={query} formQuery={formPage.queries.find(item => item.id == query.id)}/>)}
            </Grid>
            
            <Grid>
                <br/>
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

function Query({index, formQuery, responseQuery})
{
    var Component = GetQueryComponent(formQuery.type);

    return (
    <div>
        <br/>
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
                    <Typography variant="subtitle1" style={{ marginLeft: '0px' }}>{index + 1}. {formQuery.title}</Typography>
                    <Typography variant="subtitle2" style={{ marginLeft: '0px', marginBottom:'10px' }}>{formQuery.description}</Typography>

                    {!!formQuery.image ? (
                        <div>
                            <img src={formQuery.image} width="80%" height="auto" /><br></br><br></br>
                        </div>
                    ) : ""}

                    <Component query={formQuery} results={responseQuery.results} disabled/>
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
        // case 'Paragraph': return Paragraph;
        case 'Rating': return Rating;
        // case 'Text': return Text;
        default: return Unknown;
    }
}

function Unknown({query})
{
    return <div>Unknown query type {query.type}</div>;
}

function Choice({query, results })
{
    var data = query.options.map(item => ({ name: item.value, count: results.filter(result => result.values[0] == item.id).length }));

    return <div>
        <BarChart
            width={500}
            height={200}
            data={data}
            layout="vertical">
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Bar background label dataKey="count" fill="#8884d8" />
        </BarChart>
    </div>
}

function Boolean({query, results })
{
    var data = ['true', 'false'].map(item => ({ name: item, count: results.filter(result => result.values[0] == item).length }));

    return <div>
        <BarChart
            width={500}
            height={200}
            data={data}
            layout="vertical">
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Bar background label dataKey="count" fill="#8884d8" />
        </BarChart>
    </div>
}

function List({query, results })
{
    var temp = results.map(item => item.values);
    var all = temp.reduce((a, b) => !!a && !!b ? a.concat(b) : (a || b));
    var concat = [...new Set(all)];

    return <div>
        {concat.map((item, i) => <div><TextField value={item}/><br/></div>)}
    </div>;
}

function Multichoice({query, results})
{
    var data = query.options.map(item => ({ name: item.value, count: results.filter(result => result.values[0] == item.id ).length }));

    return <div>
        <BarChart
            width={500}
            height={200}
            data={data}
            layout="vertical">
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Bar background label dataKey="count" fill="#8884d8" />
        </BarChart>
    </div>
}

function Number({query, results})
{
    var [min, setMin] = React.useState(0);
    var [max, setMax] = React.useState(100);
    var [buckets, setBuckets] = React.useState(10);

    var data = new Array(buckets);
    
    var step = (max - min) / buckets;

    for (var i = 0; i < buckets; i++)
    {
        var from = min + i * step;
        var to = from + step;

        data[i] = { name: `${from} to ${to}`, count: 0};
    }

    for (var i = 0; i < results.length; i++)
    {
        var value = query.default;
        
        if (!!results[i].values)
        {
            value = results[i].values[0];
        }

        value = parseFloat(value);

        value -= min;
        value *= buckets / (max - min);
        value = Math.floor(value);

        if (value >= 0 && value < buckets)
        {
            data[value].count++;
        }
    }

    return <div>
        <TextField label='Min' type='number' value={min} onChange={e => setMin(e.target.value)}/>
        <TextField label='Max' type='number' value={max} onChange={e => setMax(e.target.value)}/>
        <TextField label='Buckets' type='number' value={buckets} onChange={e => setBuckets(e.target.value)}/>
        <BarChart
            width={500}
            height={200}
            data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Bar background label dataKey="count" fill="#8884d8" />
        </BarChart>
    </div>
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

function Rating({query, results})
{
    var count = query.options.length == 0 ? 5 : Math.max(...query.options.map(item => item.id));
    var min = 0;
    var max = count;
    var buckets = count;

    var data = new Array(buckets);
    
    var step = (max - min) / buckets;

    for (var i = 0; i < buckets; i++)
    {
        var from = min + i * step;
        var to = from + step;

        data[i] = { name: `${to}`, count: 0};
    }

    for (var i = 0; i < results.length; i++)
    {
        var value = query.default;
        
        if (!!results[i].values)
        {
            value = results[i].values[0];
        }

        value = parseFloat(value);

        value -= min;
        value *= buckets / (max - min);
        value = Math.round(value);

        if (value >= 0 && value < buckets)
        {
            data[value].count++;
        }
    }

    return <div>
        <BarChart
            width={500}
            height={200}
            data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Bar background label dataKey="count" fill="#8884d8" />
        </BarChart>
    </div>
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