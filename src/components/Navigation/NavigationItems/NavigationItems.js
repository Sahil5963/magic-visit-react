import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import color from "@material-ui/core/colors/deepOrange";
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
          <ListItem button className={classes.nested}>
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

// import React from "react";
// // import classes from "./NavigationItems.module.css";
// import NavigationItem from "./NavigationItem/NavigationItem";
// import styled, { css } from "styled-components";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// // import ExpandMore from "@material-ui/icons/ExpandMore";

// const NavList = styled.ul`
//   list-style: none;
//   padding: 0px;
// `;

// const NavigationItems = props => {
//   const [open, setOpen] = React.useState(true);

//   function handleClick() {
//     setOpen(!open);
//   }

//   return (
//     <NavList>
//       <NavigationItem link="/" exact>
//         Burger Builder
//       </NavigationItem>
//       <NavigationItem link="/" exact>
//         Burger Builder
//       </NavigationItem>
//       <NavigationItem link="/" exact>
//         Burger Builder
//       </NavigationItem>
//       <NavigationItem link="/" exact onClick={handleClick}>
//         Burger Builder
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </NavigationItem>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <NavList>
//           <NavigationItem link="/" exact>
//             Burger Builder
//           </NavigationItem>
//         </NavList>
//       </Collapse>
//     </NavList>
//   );
// };

// export default NavigationItems;

// // import { makeStyles } from '@material-ui/core/styles';
// // import ListSubheader from '@material-ui/core/ListSubheader';
// // import List from '@material-ui/core/List';
// // import ListItem from '@material-ui/core/ListItem';
// // import ListItemIcon from '@material-ui/core/ListItemIcon';
// // import ListItemText from '@material-ui/core/ListItemText';
// // import Collapse from '@material-ui/core/Collapse';
// // import InboxIcon from '@material-ui/icons/MoveToInbox';
// // import DraftsIcon from '@material-ui/icons/Drafts';
// // import SendIcon from '@material-ui/icons/Send';
// // import ExpandLess from '@material-ui/icons/ExpandLess';
// // import ExpandMore from '@material-ui/icons/ExpandMore';
// // import StarBorder from '@material-ui/icons/StarBorder';

// // const useStyles = makeStyles(theme => ({
// //   root: {
// //     width: '100%',
// //     maxWidth: 360,
// //     backgroundColor: theme.palette.background.paper,
// //   },
// //   nested: {
// //     paddingLeft: theme.spacing(4),
// //   },
// // }));

// // function NestedList() {
// //   const classes = useStyles();
// //   const [open, setOpen] = React.useState(true);

// //   function handleClick() {
// //     setOpen(!open);
// //   }

// //   return (
// //     <List
// //       component="nav"
// //       subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
// //       className={classes.root}
// //     >
// //       <ListItem button>

// //         <ListItemIcon>
// //           <SendIcon />
// //         </ListItemIcon>

// //         <ListItemText primary="Sent mail" />

// //       </ListItem>

// //       <ListItem button>
// //         <ListItemIcon>
// //           <DraftsIcon />
// //         </ListItemIcon>
// //         <ListItemText primary="Drafts" />
// //       </ListItem>
// //       <ListItem button onClick={handleClick}>
// //         <ListItemIcon>
// //           <InboxIcon />
// //         </ListItemIcon>
// //         <ListItemText primary="Inbox" />
// //         {open ? <ExpandLess /> : <ExpandMore />}
// //       </ListItem>
// //       <Collapse in={open} timeout="auto" unmountOnExit>
// //         <List component="div" disablePadding>
// //           <ListItem button className={classes.nested}>
// //             <ListItemIcon>
// //               <StarBorder />
// //             </ListItemIcon>
// //             <ListItemText primary="Starred" />
// //           </ListItem>
// //         </List>
// //       </Collapse>
// //     </List>
// //   );
// // }

// // export default NestedList;
