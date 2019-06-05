import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import "react-input-range/lib/css/index.css";

import InputRange from "react-input-range";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

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

class Setting extends Component {
  state = {
    websiteUrl: "",
    websiteHits: "",
    rangeType: "Random",
    rangeValue: {
      min: 0,
      max: 50
    },
    submittingData: false,
    submittingDataSuccess: false,
    submittingDataMessage: null,
    displayMessage: false,
    urlValid: true,
    urlValidMessage: null
  };

  handleRangeType = value => {
    this.setState(prevState => {
      return {
        rangeType: value
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rangeType != prevState.rangeType) {
      if (this.state.rangeType == "Fixed") {
        this.setState({
          rangeValue: 60
        });
      } else {
        this.setState({
          rangeValue: {
            ...this.state.rangeValue,
            min: 0,
            max: 50
          }
        });
      }
    }
  }

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

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
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
      websiteHits: "",
      rangeType: "Random",
      rangeValue: {
        min: 0,
        max: 50
      }
    });
  };

  onSubmitHandler = () => {
    this.setState({
      submittingData: true
    });

    let minRange = "";
    let maxRange = "";

    if (this.state.rangeType == "Random") {
      minRange = this.state.rangeValue.min;
      maxRange = this.state.rangeValue.max;
    } else {
      minRange = 0;
      maxRange = this.state.rangeValue;
    }

    const addWebsiteData = {
      website_url: this.state.websiteUrl,
      max_visit_time: maxRange,
      min_visit_time: minRange,
      total_required_hits: Number(this.state.websiteHits)
    };

    axios
      .post("http://13.59.190.116/api/v1/website", addWebsiteData, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        let status = res.data.status;
        let message = res.data.message;

        if (status == "RXSUCCESS") {
          this.setState({
            websiteUrl: "",
            websiteHits: "",
            rangeType: "Random",
            rangeValue: {
              min: 0,
              max: 50
            },
            submittingData: false,
            submittingDataSuccess: true,
            submittingDataMessage: message,
            displayMessage: true
          });
        } else {
          this.setState({
            submittingData: false,
            submittingDataSuccess: false,
            submittingDataMessage: message,
            displayMessage: true
          });
        }
      });
  };

  rangeSelectorValueChangeHandler = value => {
    this.setState(prevState => {
      return {
        ...this.state,
        rangeValue: value
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
          <h3 className={classes.heading}>Change Your Password </h3>
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
                  id="password"
                  error={!this.state.urlValid}
                  helperText={this.state.urlValidMessage}
                  label="Enter New Password"
                  className={classes.textField}
                  type="password"
                  name="websiteUrl"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  value={this.state.websiteUrl}
                  onChange={this.inputUrlChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  error={!this.state.urlValid}
                  helperText={this.state.urlValidMessage}
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  name="websiteUrl"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  value={this.state.websiteUrl}
                  onChange={this.inputUrlChangeHandler}
                />
              </Grid>

              <Grid item xs={12} className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={(classes.button, classes.submitButton)}
                  onClick={this.onSubmitHandler}
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

export default withStyles(styles)(connect(mapStateToProps)(Setting));
