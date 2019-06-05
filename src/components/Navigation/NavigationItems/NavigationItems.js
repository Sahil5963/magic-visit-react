import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";

import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.6)"
  },
  selected: {
    color: "#2DE6AA",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      background: "#2DE6AA",
      height: "100%",
      left: "0",
      width: "3px"
    }
  },
  listItem: {
    padding: ".8rem 1rem .8rem 1rem"
  },
  nested: {
    paddingLeft: theme.spacing(9)
  },
  listItemIcon: {
    color: "inherit"
  },
  selectedListItem: {
    color: "#2DE6AA",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      background: "#2DE6AA",
      height: "100%",
      left: "0",
      width: "3px"
    }
  },
  selectedListItemNested: {
    color: "#2DE6AA",
    position: "relative"
  }
}));

function NavigationItems(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List component="nav" className={classes.root}>
      <ListItem
        button
        selected={props.location.pathname == "/"}
        classes={{
          root: classes.listItem,
          selected: classes.selectedListItem
        }}
        component={Link}
        to="/"
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Icon>data_usage</Icon>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        classes={{
          root: classes.listItem,
          selected: classes.selectedListItem
        }}
        selected={props.location.pathname == "/push-website-form"}
        component={Link}
        to="/push-website-form"
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Icon>compare_arrows</Icon>
        </ListItemIcon>
        <ListItemText primary="Push Website" />
      </ListItem>
      <ListItem
        button
        onClick={handleClick}
        classes={{
          root: classes.listItem
        }}
        selected={open}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Icon>laptop_chromebook</Icon>
        </ListItemIcon>
        <ListItemText primary="Websites" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            classes={{
              root: classes.listItem,
              selected: classes.selectedListItemNested
            }}
            selected={props.location.pathname == "/add-new-website"}
            component={Link}
            to="/add-new-website"
          >
            <ListItemText primary="Add Website" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            classes={{
              root: classes.listItem,
              selected: classes.selectedListItemNested
            }}
            selected={props.location.pathname == "/website-list"}
            component={Link}
            to="/website-list"
          >
            <ListItemText primary="List Website" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        button
        classes={{
          root: classes.listItem,
          selected: classes.selectedListItem
        }}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
}

export default withRouter(NavigationItems);
