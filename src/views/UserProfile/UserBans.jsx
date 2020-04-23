import React from 'react'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { useHistory } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBar';

export default function UserBans() {

  return (
    <div>
      <GridContainer>
        <CardHeader color="success">
          <h3>User Bans</h3>
        </CardHeader>
      </GridContainer>
      <GridContainer>
        <GridItem>
          <SearchBar searchFor="by user ID"/>
        </GridItem>
      </GridContainer>
    </div>
  )
}
