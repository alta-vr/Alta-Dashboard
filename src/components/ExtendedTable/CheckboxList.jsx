import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

export function CheckboxItem({ value, index, handleToggle }) {
  return (
    <ListItem
      // style={{ width: "50px" }}
      dense
      button
      onClick={() => handleToggle(index)}
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={value.state} />
      </ListItemIcon>
      <ListItemText primary={value.name} />
    </ListItem>
  );
}

export function CheckboxList({ items, handleChange, renderButton }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        {renderButton ? renderButton() : "Toggle List"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListContent defaultItems={items} handleChange={handleChange} />
      </Menu>
    </div>
  );
}

function ListContent({ defaultItems, handleChange }) {
  const [items, setItems] = React.useState(defaultItems);
  const [selectAll, setSelectAll] = React.useState(true);

  function handleToggle(index) {
    var newItems = Array.from(items);
    newItems[index].state = !newItems[index].state;
    setItems(newItems);
    handleChange(newItems);
  }

  return (
    <List>
      <CheckboxItem
        value={{ name: "Select All", state: selectAll }}
        index={-1}
        handleToggle={() => {
          var newState = !selectAll;

          var newItems = Array.from(items);
          for (var item of newItems) {
            item.state = newState;
          }
          setSelectAll(newState);
          setItems(newItems);
          handleChange(newItems);
        }}
      />
      <Divider />
      {items.map((value, index) => {
        return (
          <CheckboxItem
            value={value}
            index={index}
            handleToggle={handleToggle}
          />
        );
      })}
    </List>
  );
}
