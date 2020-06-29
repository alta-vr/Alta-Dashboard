import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from '../components/Grid/GridItem';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardIcon from '../components/Card/CardIcon';
import { Icon } from '@material-ui/core';
import CardFooter from '../components/Card/CardFooter';

import Warning from "@material-ui/icons/Warning";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


function Wrapper({classes, color, icon, title, value, cardOnly, children, hasFooter})
{
    var Result = <Card style={{height:'calc(100% - 15px)'}}>
        <CardHeader color={color} stats icon>
        <CardIcon color={color}>
            <Icon>{icon}</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>{title}</p>
        <h3 className={classes.cardTitle}>{value}</h3>
        </CardHeader>
        <div style={{overflowY: 'auto'}}>
            {hasFooter ? children.slice(0, -1) : children}
        </div>
        {hasFooter ? children[children.length - 1] : null}
    </Card>;

    if (!!cardOnly)
    {
        return Result;
    }

    return <GridItem xs={12} sm={6} md={3}>
        {Result}
    </GridItem>;
}

export default withStyles(styles)(Wrapper);