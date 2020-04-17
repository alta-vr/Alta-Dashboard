import React, { useEffect } from "react";
import PropTypes from "prop-types";

// core components
import { useParams } from "react-router-dom";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function ServerView () {

    let {serverId } = useParams();
    useEffect( () => {/*oncomponentMount*/});

  return (
      <div className="container">
      <GridContainer>
          <GridItem>
            This is page for server <h2>#{serverId}</h2>
          </GridItem>
      </GridContainer>
      <GridContainer>
              <List>
                  <ListItem button onClick={console.log("Button clicked")}>
                      A button
                  </ListItem>
              </List>
        </GridContainer>
        </div>
    );
    
  // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>

};

ServerView.propTypes = {
};

export default ServerView;
