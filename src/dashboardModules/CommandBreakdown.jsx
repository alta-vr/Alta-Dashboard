import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from '@material-ui/core';
import { invoke } from 'q';

export const moduleName = 'Command Breakdown';

export const moduleSize =
{
    defaultWidth: 2,
    defaultHeight: 2,
    minWidth: 2,
    minHeight: 4,
    maxWidth: 4,
    maxHeight: 100
}

export const module = ({ config, onConfigChange, group, server, connection }) =>
{
    var [modules, setModules] = React.useState();
    var [search, setSearch] = React.useState({query: ""});

    connection.useCommand('help modules', result => setModules(fix(result.data.Result)));
    
    function onSearch(e)
    {
        if (e.target.value == "")
        {
            setSearch({query: ""});
        }
        else
        {
            var results = searchModules(modules, e.target.value);

            setSearch({query: e.target.value, results});
        }
    }

    var moduleResults = search.results == undefined ? modules : search.results;

    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='info' title={moduleName} />
            <CardBody style={{height:'0'}}>
                {!moduleResults ? "Not connected..." : 
                <>
                    <TextField value={search.query} label='Search' onChange={onSearch} fullWidth/>
                    <div style={{ overflowY: 'auto', height:'100%' }}>{moduleResults.map(renderModule)}</div>
                </>}
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};

function fix(results)
{
    var sorted = results.sort(sortByName);

    for (var item of sorted)
    {
        fixModule(item);
    }

    return sorted;
}

function fixModule(item)
{
    item.Submodules = item.Submodules.sort(sortByName);
    item.Commands = item.Commands.sort(sortByName);

    for (var sub of item.Submodules)
    {
        fixModule(sub);
    }
}

function sortByName(a, b)
{
    if (!!a.Name) return 1;
    if (!!b.Name) return -1;

    return a.Name > b.Name ? 1 : -1;
}

function searchModules(modules, query)
{
    var results = modules.map(item =>
    {
        if (item.Name.includes(query))
        {
            return item;
        }

        var copy = {...item};

        copy.Submodules = searchModules(copy.Submodules, query);
        copy.Commands = searchCommands(copy.Commands, query);

        if (copy.Submodules.length == 0 && copy.Commands.length == 0)
        {
            return undefined;
        }

        return copy;
    })

    return results.filter(item => !!item);
}

function searchCommands(commands, query)
{
    return commands.filter(item => !!item.Name && item.Name.includes(query));
}

function renderModule(item)
{
    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography>{item.Name}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection:'column'}}>
            {item.Submodules.length > 0 ? <h5 style={{marginTop:'1em'}}>Submodules</h5> : null}
            {item.Submodules.map(renderModule)}
            {item.Commands.length > 0 ? <h5 style={{marginTop:'1em'}}>Commands</h5> : null}
            {item.Commands.map(renderCommand)}
        </AccordionDetails>
    </Accordion>
}

// function renderCommand(item)
// {
//     return <>
//             <Typography>{item.Name || "(Default)"}</Typography>
//             {item.Parameters.map(param => <p><b>{param.Name}</b> <i>({param.Type})</i></p>)}
//             <p>{item.Description}</p>
//         </>
// }

function renderCommand(item)
{
    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography>{item.Name || "(Default)"}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection:'column'}}>
            {item.Parameters.map(param => <p><b>{param.Name}</b> <i>({param.Type})</i></p>)}
            <p>{item.Description}</p>
        </AccordionDetails>
    </Accordion>
}