import React from 'react';

import { Card, Icon, } from "@material-ui/core";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import { withStyles } from "@material-ui/styles";

import sharedStyles from './sharedStyles';


export const ModuleWrapper = withStyles(sharedStyles)(({children, classes}) =>
{
    return <Card className={classes.card}>
        {children}
    </Card>;
});

export function Field({label, valueStyle, children})
{
  return <><label>{label}</label><br/><span style={valueStyle}>{children}</span><p/></> 
}

export const BasicHeader = withStyles(sharedStyles)(({color, title, value, classes}) =>
{
   return (
   <CardHeader color={color}>{title}</CardHeader>
   );
});

export const StatHeader = withStyles(sharedStyles)(({color, icon, title, value, classes}) =>
{
   //Lookup icons here: https://material-ui.com/components/material-icons/

   return (
   <CardHeader color={color} stats icon>
       <CardIcon color={color}>
           <Icon>{icon}</Icon>
       </CardIcon>
       <p className={classes.cardCategory}>{title}</p>
       <h3 className={classes.cardTitle}>{value || ' '}</h3>
   </CardHeader>
   );
});