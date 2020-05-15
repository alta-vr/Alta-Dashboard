import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Container from "@material-ui/core/Container";
import DropDownMenu from "../../../components/Menu/DropDownMenu";
import BanList from "components/Lists/BanList.jsx";
import UserInputField from "components/Validator/UserInputField.jsx";
import { Bans } from "alta-jsapi";
import { useHistory } from "react-router-dom";

const listTypes = [
  // functions to get ban lists
  // { func: Bans.getAll, label: "All" },
  // { func: (event ) =>Bans.getModBans(event), label: "Created by" },
  // { func: getUserBans, label: "For user" },
  { label: "All", func: "all" },
  { label: "Created by", func: "by" },
  { label: "For user", func: "for" },
];

export default function UserBans() {
  const [currentListType, setCurrentListType] = useState(listTypes[0]);
  const [currentList, setCurrentList] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [showInput, setShowInput] = useState(false);
  let validUser = false;
  const history = useHistory();

  // useEffect(() => {
  //   getListFunc()
  //     .then(setBanList)
  //     .catch((e) => console.log("Error: " + e), setBanList([]));
  //   console.log("Ban list: ", banList);
  // }, [currentList]);

  useEffect(() => {
    if (currentList != undefined) {
      getAllBans();
    }
  }, []);

  // let test = { name: "me", num: "123" };
  // useEffect(() => {
  //   test.newthing = "new thing";
  //   console.log("test thing", test);
  //   if (userId != undefined) {
  //     handleCurrentFunc(currentListType);
  //   }
  //   setCurrentList([]);
  // }, [userId]);

  function getAllBans() {
    Bans.getAll()
      .then((bans) => setCurrentList(bans))
      .catch((e) => console.log("viewbans error: ", e));
  }

  function getUserBans() {
    Bans.getUserBans(userId)
      .then((bans) => setCurrentList(bans))
      .catch((e) => console.log("viewbans error: ", e));
  }

  function getModBans() {
    console.log("viewbans getmod userId: ", userId);
    Bans.getModBans(userId)
      .then((bans) => setCurrentList(bans))
      .catch((e) => console.log("viewbans error: ", e));
  }

  function handleUserInput(userInfo) {
    if (userInfo == undefined) {
      validUser = false;
      setUserId(undefined);
      return;
    }
    validUser = true;
    setUserId(userInfo.id);
  }

  function handleDropDown(banListType) {
    setCurrentListType(banListType);
    handleCurrentFunc(banListType);
  }

  function handleCurrentFunc(banListType) {
    switch (banListType.func) {
      case "all":
        setCurrentList(getAllBans());
        setShowInput(false);
        break;
      case "by":
        setCurrentList(getModBans(userId));
        setShowInput(true);
        break;
      case "for":
        setCurrentList(getUserBans(userId));
        setShowInput(true);
        break;
    }
    console.log("Current list: ", currentList);
  }

  function goBack() {
    history.goBack();
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={goBack}>
        Go Back
      </Button>
      <br />
      <Container>
        <h2>View Bans</h2>
      </Container>
      <GridContainer>
        <GridItem>
          <DropDownMenu
            title="bans list"
            values={listTypes}
            handleChange={(banListType) => handleDropDown(banListType)}
          />
        </GridItem>
        {showInput ? (
          <GridItem>
            <form>
              <UserInputField onValidateInput={handleUserInput} />
            </form>
          </GridItem>
        ) : (
          <></>
        )}
      </GridContainer>
      <BanList currentList={currentList} />
    </div>
  );
}
