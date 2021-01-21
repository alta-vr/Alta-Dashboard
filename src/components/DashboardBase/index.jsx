import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { TextField, Icon } from "@material-ui/core";

import { Responsive, WidthProvider } from 'react-grid-layout';

import { Autocomplete } from "@material-ui/lab";


import { Servers, Groups, Sessions } from 'alta-jsapi';

const ResponsiveGridLayout = WidthProvider(Responsive);

var dataStore = {};

function getData(id)
{
    if (dataStore[id] === undefined)
    {
        try { dataStore[id] = JSON.parse(global.localStorage.getItem(id)) || {}; } catch (e) { dataStore[id] = {}; }
    } 

    return dataStore[id];
}

function getFromLS(id, key) 
{
    return getData(id)[key];
}

function saveToLS(id, key, value) 
{
    var data = getData(id);

    data[key] = value;

    if (global.localStorage)
    {
        var store = JSON.stringify(data);

        global.localStorage.setItem(
            id,
            store
        );
    }
}

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

export default function DashboardBase({storageId, defaultLayout, defaultData, moduleProps, moduleMap})
{
    var [addModuleSearch, setAddModuleSearch] = useState('');

    var [breakpoint, setBreakpoint] = useState('lg');

    var [layouts, setLayouts] = useState();

    function getOriginalLayouts(storageId)
    { 
        return getFromLS(storageId, "layouts") || defaultLayout;
    }
    
    function getOriginalDatas(id) { return defaultData; }

    React.useEffect(() =>
    {
        setLayouts(getOriginalLayouts(storageId));
    },
    [storageId])

    function modifyLayout(layout, newLayouts)
    {
        saveToLS(storageId, "layouts", newLayouts);
        setLayouts(newLayouts);
    }

    function modifyBreakpoint(newBreakpoint, columns)
    {
        setBreakpoint(breakpoint);
    }

    function createElement(element)
    {
        var key = element.i;
        var data = getFromLS(storageId, element.i) || getOriginalDatas(storageId)[element.i];
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
                <ModuleComponent key={element.i} box={element} config={data} onConfigChange={newData => saveToLS(storageId, key, { ...newData, content })} {...moduleProps} />
            </ErrorBoundary>
        </div>;
    }

    function remove(element)
    {
        var { i } = element;

        var newLayouts = { [breakpoint]: layouts[breakpoint].filter(item => item.i != i) };

        saveToLS(storageId, "layouts", newLayouts);
        saveToLS(storageId, i, undefined);

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

        saveToLS(storageId, "layouts", newLayouts);
        saveToLS(storageId, id, { content: newValue.name });

        setLayouts(newLayouts);
    }

    var addList = Object.entries(moduleMap).map(item => ({ name: item[0], component: item[1] }));

    for (var key in layouts)
    {
        for (var i = 0; i < layouts[key].length; i++)
        {
            var entry = layouts[key][i];

            var size = moduleMap[(getFromLS(storageId, entry.i) || getOriginalDatas(storageId)[entry.i]).content].moduleSize;

            entry.minW = size.minWidth;
            entry.maxW = size.maxWidth;
            entry.minH = size.minHeight;
            entry.maxH = size.maxHeight;
            entry.isResizable = !(entry.minW == entry.w && entry.maxW == entry.w && entry.minH == entry.h && entry.maxH == entry.h);
        }
    }

    if (!layouts)
    {
        return null;
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
            draggableCancel={'p, input, label, h1, h2, h3, h4, h5, h6, tr, td, li, code'}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
            {!!layouts[breakpoint] ? layouts[breakpoint].map(createElement) : undefined}
        </ResponsiveGridLayout>
    </>;
}
