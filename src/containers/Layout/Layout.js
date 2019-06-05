import React from "react";

import AppBar from "@material-ui/core/AppBar";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import Icon from "@material-ui/core/Icon";

import Logo from "../../components/Logo/Logo";

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    background: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    boxShadow: `0px 2px 4px rgba(0,0,0,0.17)`
  },
  logo: {
    display: "flex",
    alignItems: "center",
    padding: "2rem 0rem",
    justifyContent: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#232931"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    background: "#E1FFF5",
    minHeight: "100vh"
  },
  title: {
    flexGrow: 1,
    color: "#0F0F0F"
  },
  button: {
    borderRadius: "60px",
    fontSize: ".9rem",
    background: "rgba(0,0,0,0.1)",
    padding: ".6rem 1.2rem",
    textTransform: "none",
    "& .material-icons": {
      marginLeft: ".8rem",
      fontSize: "1.4rem"
    },
    "&:hover": {
      background: "#2DE6AA"
    }
  }
}));

function Layout(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.logo}>
        <Logo color1="#fff" color2="#2DE6AA" height="60px" />
      </div>
      <NavigationItems />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <h3 className={classes.title}>Magic Visit </h3>

          <Button className={classes.button} component={Link} to="/logout">
            Logout
            <Icon className={classes.rightIcon}>exit_to_app</Icon>
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
