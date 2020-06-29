import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';


const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

function Wrapper({title, subtitle, children, classes})
{
    return <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{title}</h4>
                    <p className={classes.cardCategoryWhite}>{subtitle}</p>
                </CardHeader>
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        </GridItem>
    </GridContainer>
}

export default withStyles(styles)(Wrapper);