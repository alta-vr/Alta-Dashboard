import React from "react";

import moduleMap from './modules/moduleMap';

import DashboardBase from '../../components/DashboardBase';

import { withPolicies } from "../../components/SessionCheck";

const originalLayouts = {
    lg: [{ i: 'o-1', x: 0, y: 0, w: 2, h: 2 }],
};

const originalDatas = {
    ['o-1']: { content: 'QuickLinks' }
}

function ModeratorDashboard()
{    
    return <DashboardBase 
        moduleMap={moduleMap}
        storage-id="mod-dashboard"
        defaultLayout={originalLayouts}
        defaultData={originalDatas}
        moduleProps={{}}/>;
}


export default withPolicies('mod')(ModeratorDashboard);