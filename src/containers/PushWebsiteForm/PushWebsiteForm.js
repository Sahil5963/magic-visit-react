import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import "react-input-range/lib/css/index.css";

import InputRange from "react-input-range";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

import io from "socket.io-client";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "1rem 2rem",
    minHeight: "90%"
  },
  heading: {
    marginBottom: "2rem"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  rangeSection: {
    margin: "0rem 0rem"
  },
  rangeSelector: {
    margin: "2rem 0rem"
  },
  buttons: {
    margin: "1rem 0rem"
  },

  submitButton: {
    marginRight: "1rem"
  },
  label: {
    fontWeight: "700"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006FFF"
    }
  }
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={props.closeDisplayMessage}
        >
          <CloseIcon />
        </IconButton>
      ]}
      {...other}
    />
  );
}

class PushWebsiteForm extends Component {
  state = {
    websiteUrl: "",
    totalVisitTime: 40,
    submittingData: false,
    submittingDataSuccess: false,
    submittingDataMessage: null,
    displayMessage: false,
    urlValid: true,
    urlValidMessage: null
  };

  showDisplayMessage = () => {
    this.setState({
      showDisplayMessage: true
    });
  };

  closeDisplayMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      displayMessage: false
    });
  };

  inputUrlChangeHandler = e => {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.value.match(regex)) {
      this.setState({
        urlValid: true,
        urlValidMessage: "URL is valid"
      });
    } else {
      this.setState({
        urlValid: false,
        urlValidMessage: "Enter Valid URL"
      });
    }
  };

  onResetHandler = () => {
    this.setState({
      websiteUrl: "",
      totalVisitTime: 40,
      urlValid: true
    });
  };

  componentDidMount() {}

  onPushWebsiteHandler = () => {
    const socket = io("http://13.59.190.116:3000");

    if (this.state.urlValid && this.state.websiteUrl != "") {
      this.setState({
        submittingData: true
      });

      const pushWebsite = {
        website_url: this.state.websiteUrl,
        visiting_time: this.state.totalVisitTime
      };

      socket.emit("sendPushWebsite", { response: { ...pushWebsite } });

      this.setState({
        submittingDataSuccess: true,
        submittingDataMessage: "Website Pushed Succesfully",
        displayMessage: true,
        submittingData: false
      });

      this.onResetHandler();
    } else if (this.state.websiteUrl == "") {
      this.setState({
        submittingDataSuccess: false,
        submittingDataMessage: "Enter a valid URL",
        displayMessage: true
      });
    } else {
      this.setState({
        submittingDataSuccess: false,
        submittingDataMessage: "Enter a valid URL",
        displayMessage: true
      });
    }
  };

  rangeSelectorValueChangeHandler = value => {
    this.setState(prevState => {
      return {
        ...this.state,
        totalVisitTime: value
      };
    });
  };

  render() {
    const { classes } = this.props;

    let submittingData = null;

    if (this.state.submittingData) {
      submittingData = <LinearProgress />;
    } else {
      submittingData = null;
    }

    return (
      <ThemeProvider theme={theme}>
        {submittingData}

        <div className={classes.root}>
          <h3 className={classes.heading}>Add New Website </h3>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.state.displayMessage}
            autoHideDuration={6000}
            onClose={this.closeDisplayMessage}
          >
            <MySnackbarContentWrapper
              closeDisplayMessage={this.closeDisplayMessage}
              variant={this.state.submittingDataSuccess ? "success" : "error"}
              message={this.state.submittingDataMessage}
            />
          </Snackbar>
          <form className={classes.formContainer} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="websiteUrl"
                  error={!this.state.urlValid}
                  helperText={this.state.urlValidMessage}
                  label="Enter Website URL"
                  className={classes.textField}
                  type="text"
                  name="websiteUrl"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  value={this.state.websiteUrl}
                  onChange={this.inputUrlChangeHandler}
                />
              </Grid>
              <Grid item xs={12} className={classes.rangeSection}>
                <label className={classes.label}>Select Visiting Time :</label>
                <div className={classes.rangeSelector}>
                  <InputRange
                    maxValue={600}
                    formatLabel={value => `${value} Sec`}
                    minValue={0}
                    value={this.state.totalVisitTime}
                    onChange={value =>
                      this.rangeSelectorValueChangeHandler(value)
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={(classes.button, classes.submitButton)}
                  onClick={this.onPushWebsiteHandler}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  size="large"
                  onClick={() => this.onResetHandler()}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3} />
            </Grid>
          </form>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default withStyles(styles)(connect(mapStateToProps)(PushWebsiteForm));
