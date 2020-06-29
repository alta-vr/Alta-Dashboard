import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { TextField, Icon } from "@material-ui/core";

import { Responsive, WidthProvider } from 'react-grid-layout';

import moduleMap from 'dashboardModules/core/moduleMap';
import { Autocomplete } from "@material-ui/lab";


import { Servers, Groups, Sessions } from 'alta-jsapi';
import { Connection, Message, MessageType } from 'att-websockets';
import { EventEmitter } from "events";

import DashboardConnection from './dashboardConnection';

const ResponsiveGridLayout = WidthProvider(Responsive);

var data = {};
try { data = JSON.parse(global.localStorage.getItem("alta-dashboard")) || {}; } catch (e) { data = {}; }

console.log("Data:");
console.log(data);

const originalLayouts = getFromLS("layouts") || {
    lg: [{ i: 'o-1', x: 0, y: 0, w: 2, h: 2 }],
};

const originalDatas = {
    ['o-1']: { content: 'Template' }
}

function getFromLS(key) 
{
    return data[key];
}

function saveToLS(key, value) 
{
    data[key] = value;

    if (global.localStorage)
    {
        var store = JSON.stringify(data);

        global.localStorage.setItem(
            "alta-dashboard",
            store
        );
    }
}


// const useStyles = makeStyles((theme) => ({
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   }
// }));

// function ExpandButton({expanded, setExpanded})
// {
//   const classes = useStyles();

//   return <IconButton
//     className={clsx(classes.expand, {
//       [classes.expandOpen]: expanded,
//     })}
//     onClick={() => setExpanded(!expanded)}
//     aria-expanded={expanded}
//     aria-label="show more"
//   >
//     <ExpandMoreIcon />
//   </IconButton>
// }

class ErrorBoundary extends React.Component 
{
    constructor(props) {
      super(props);
      this.state = { };
    }
  
    static getDerivedStateFromError(error) {
      
      return { error : error.message };
    }
  
    componentDidCatch(error, errorInfo) {
        
    }
  
    render() {
      if (!!this.state.error) {
        // You can render any custom fallback UI
        return <><h4>Something went wrong in {this.props.name}.</h4><p>{this.state.error}</p></>;
      }
  
      return this.props.children; 
    }
}


var connection;

export function getConnection() { return connection; }

export default function ServerViewer()
{
    var { serverId } = useParams();
    var history = useHistory();
    var currentPath = useLocation().pathname;

    var [server, setServer] = useState(undefined);
    var [group, setGroup] = useState(undefined);
    var [error, setError] = useState(undefined);

    var [addModuleSearch, setAddModuleSearch] = useState('');

    var [breakpoint, setBreakpoint] = useState('lg');

    var [layouts, setLayouts] = useState(originalLayouts);
    var [datas, setDatas] = useState(originalDatas);

    var [junk, setJunk] = useState(0);

    function forceUpdate()
    {
        setJunk(junk + 1);
    }

    function refresh()
    {
        let isMounted = true;

        if (!!connection && connection.serverId != serverId)
        {
            connection.terminate();
            connection = null;
        }

        if (!connection)
        {
            connection = new DashboardConnection(serverId);
            
            connection.on('connected', forceUpdate);
            connection.on('disconnected', forceUpdate);
            connection.on('failed', forceUpdate);
            connection.attempt();
        }

        Servers.getDetails(serverId)
            .then(server =>
            {
                if (isMounted && server.id == serverId)
                {
                    if ((!group || group.id != server.group_id) && !!server.group_id)
                    {
                        Groups.getGroupInfo(server.group_id)
                            .then(group => { if (isMounted && server.group_id == group.id) setGroup(group) })
                            .catch(error => { if (isMounted && server.group_id == group.id) setError(error) });
                    }

                    let time = Date.parse(server.online_ping);
                    let elapsed = Date.now() - time;
                    let hasTime = elapsed < 600000;

                    setTimeout(refresh, hasTime ? 32000 - elapsed : 60000);
                    setServer(server);

                    if (server.online_players.length > 0)
                    {
                        connection.attempt();
                    }
                }
            })
            .catch(error => { if (isMounted) setError(error) });

        return () => 
        {
            isMounted = false;

            if (!!connection)
            {
                connection.terminate();
                connection = null;
            }
        };
    }

    useEffect(() =>
    {
        setGroup(undefined);
        return refresh();
    }, [serverId]);

    if (!!error)
    {
        return <div>{error}</div>
    }

    if (!server || (!group && !!server.group_id))
    {
        return <div>Loading...</div>;
    }

    function modifyLayout(layout, newLayouts)
    {
        saveToLS("layouts", newLayouts);
        setLayouts(newLayouts);
    }

    function modifyBreakpoint(newBreakpoint, columns)
    {
        setBreakpoint(breakpoint);
    }

    var connectionInfo = {
        subscribe: connection.subscribe.bind(connection),
        unsubscribe: connection.unsubscribe.bind(connection),
        send: connection.send.bind(connection),
        isConnecting: connection.isConnecting,
        isForbidden: connection.isForbidden,
        isConnected: connection.isConnected,
        isTerminated: connection.isTerminated,
        useEvent: (event, callback) =>
        {
            useEffect(() =>
            {
                let cache = connection;

                cache.on(event, callback);

                return () => cache.removeListener(event, callback);
            },
            [serverId]);
        },
        useCommand: (command, callback, deps = []) =>
        {
            useEffect(() =>
            {
                let cache = connection;
                let run = () => cache.send(command).then(callback);

                if (cache.isConnected)
                {
                    run();
                }
                else
                {
                    cache.on('connected', run);

                    return () => cache.removeListener('connected', run);
                }
            },
            [...deps, serverId]);
        },
        useSubscription: (event, callback) =>
        {
            useEffect(() =>
            {
                console.log("Use Effect " + event);
                
                let cache = connection;

                cache.subscribe(event, callback);

                return () => cache.unsubscribe(event, callback);
            },
            [serverId]);
        }
    };

    function createElement(element)
    {
        var key = element.i;
        var data = getFromLS(element.i) || originalDatas[element.i];
        var content = data.content;

        var moduleInfo = moduleMap[data.content];

        var dataGrid =
        {
            ...element,
            minW: moduleInfo.moduleSize.minWidth,
            minH: moduleInfo.moduleSize.minHeight,
            maxW: moduleInfo.moduleSize.maxWidth,
            maxH: moduleInfo.moduleSize.maxHeight,
            w: element.w || moduleInfo.moduleSize.defaultWidth,
            h: element.h || moduleInfo.moduleSize.defaultHeight
        };

        var ModuleComponent = moduleInfo.module;
        
        return <div key={element.i} data-grid={dataGrid} style={{ overflow: 'hidden', position:'relative' }}>
            <Icon color='error' style={{position: 'absolute', top:0, right:0, width:'20px', height:'20px', cursor:'pointer'}} onClick={() => remove(element)}>close</Icon>
            <ErrorBoundary name={moduleInfo.moduleName}>
                <ModuleComponent key={element.i} config={data} onConfigChange={newData => saveToLS(key, { ...newData, content })} group={group} server={server} connection={connectionInfo} />
            </ErrorBoundary>
        </div>;
    }

    function remove(element)
    {
        var { i } = element;

        var newLayouts = { [breakpoint]: layouts[breakpoint].filter(item => item.i != i) };

        saveToLS("layouts", newLayouts);
        saveToLS(i, undefined);

        setLayouts(newLayouts);
    }

    function add(event, newValue)
    {
        setAddModuleSearch('');

        do
        {
            var id = 'm-' + Math.floor(Math.random() * Math.floor(1000000));
        }
        while (layouts[breakpoint].some(item => item.id == id));

        var newItem = { i: id, x: 0, y: Infinity, w: newValue.component.moduleSize.defaultWidth, h: newValue.component.moduleSize.defaultHeight };

        var newLayouts = { [breakpoint]: [...layouts[breakpoint], newItem] };

        saveToLS("layouts", newLayouts);
        saveToLS(id, { content: newValue.name });

        setLayouts(newLayouts);
    }

    var addList = Object.entries(moduleMap).map(item => ({ name: item[0], component: item[1] }));

    for (var key in layouts)
    {
        for (var i = 0; i < layouts[key].length; i++)
        {
            var entry = layouts[key][i];

            var size = moduleMap[(getFromLS(entry.i) || originalDatas[entry.i]).content].moduleSize;

            entry.minW = size.minWidth;
            entry.maxW = size.maxWidth;
            entry.minH = size.minHeight;
            entry.maxH = size.maxHeight;
            entry.isResizable = !(entry.minW == entry.w && entry.maxW == entry.w && entry.minH == entry.h && entry.maxH == entry.h);
        }
    }


    return <>
        <Autocomplete
            id="combo-box-demo"
            value={null}
            inputValue={addModuleSearch}
            onInputChange={(a, value) => setAddModuleSearch(value)}
            onChange={add}
            options={addList}
            getOptionLabel={(option) => option.component.moduleName}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Add Module" variant="outlined" />}
        />
        <ResponsiveGridLayout
            className="layout"
            style={{ marginTop: '30px' }}
            layouts={layouts}
            onLayoutChange={modifyLayout}
            onBreakpointChange={modifyBreakpoint}
            rowHeight={120}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
            {!!layouts[breakpoint] ? layouts[breakpoint].map(createElement) : undefined}

            {/*
      <div key='c'> 
      <DashboardCard color="warning" icon="gavel" title="Moderation" cardOnly>
        <CardBody>
          <Button fullWidth onClick={goToConsole}>View Console</Button>
        </CardBody>
      </DashboardCard>  
      </div>
      <div key='d'>
      <DashboardCard color="info" icon="accessibility" title="Online Players" value={server.online_players.length} cardOnly>
        <Collapse in>
          <CardBody>
          
          </CardBody>
        </Collapse>
      </DashboardCard>
      </div> */}
        </ResponsiveGridLayout>
    </>;
}
