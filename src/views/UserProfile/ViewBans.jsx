import React, {useState} from 'react'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { useHistory } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '@material-ui/core/Container';
import DropDownMenu from '../../components/Menu/DropDownMenu';
import BanList from 'components/Lists/BanList.jsx'
import { Bans } from 'alta-jsapi';

const lists = [
  // functions to get ban lists
  { func: () => [{id: "All bans"}], label: "All" },
  { func: () => [{id: "Mod bans"}], label: "Some" },
  { func: () => [{id: "User bans"}], label: "Some" }
  // { func: Bans.getAll, label: "All" },
  // { func: Bans.getModBans, label: "Created by" },
  // { func: Bans.getUserBans, label: "For user" }
]

export default function UserBans() {

  const [currentList, setCurrentList] = useState(lists[0]);

  function handleDropDown(event) {
    setCurrentList(event.target.value);
  }

  return (
    <div>
      <Container><h2>View Bans</h2></Container>
      <GridContainer>
        <GridItem>
            <DropDownMenu
              title="bans list"
              values={lists}
              handleChange={(event) => handleDropDown(event)}
            />
        </GridItem>
      </GridContainer>
      <BanList getListFunc={currentList.func} />
    </div>
  )
}
