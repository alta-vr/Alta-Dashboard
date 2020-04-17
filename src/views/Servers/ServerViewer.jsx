import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.jsx";
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function ServerViewer () {

    let {serverId } = useParams();
    useEffect( () => {/*oncomponentMount*/});

  return (
      <div className="container">
      <GridContainer>
              <List>
                  <ListItem button>
                      A button
                  </ListItem>
              </List>
        </GridContainer>
        </div>
    );

};

ServerViewer.propTypes = {
};

export default ServerViewer;
