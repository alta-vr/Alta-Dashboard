import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx"
import Icon from "@material-ui/core/Icon";
import Danger from "components/Typography/Danger.jsx";
import Warning from "@material-ui/icons/Warning";

const DashboardStat = ({classes, color, icon, title}) => {
    return (
    <GridItem xs={12} sm={6} md={3}>
      <Card>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}>
            <Icon>{icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{title}</p>
          <h3 className={classes.cardTitle}>
            49/50 <small>GB</small>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <Danger>
              <Warning />
            </Danger>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              Get more space
            </a>
          </div>
        </CardFooter>
      </Card>
    </GridItem>
    );
};

export default DashboardStat;