import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Expandable({ title, path, items, ...props }) {
  const { classes } = props;
  const { list } = items;
  console.log(props);
  return (
    <ExpansionPanel>
        <ExpansionPanelSummary>
          Expansion Panel 1
        </ExpansionPanelSummary>
      {/* {list.map(tab=> */}
      <NavLink
      to={path}
      className={{}}
      activeClassName="active"
      // key={key}
    >
        <ExpansionPanelDetails>
          {items}
        </ExpansionPanelDetails>
        {/* )} */}
      </NavLink>
    </ExpansionPanel>
  )
}
