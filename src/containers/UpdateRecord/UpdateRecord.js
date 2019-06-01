import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import "react-input-range/lib/css/index.css";

import InputRange from "react-input-range";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

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
  button: {
    // marginRight: "1rem",
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

class UpdateRecord extends Component {
  state = {
    websiteUrl: "",
    websiteHits: "",
    rangeType: "Random",
    rangeValue: {
      min: 0,
      max: 50
    },
    fetchingData: false
  };

  handleRangeType = value => {
    this.setState(prevState => {
      return {
        rangeType: value
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("Did update");

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

  componentDidMount() {
    this.setState({
      fetchingData: true
    });

    axios
      .get("http://13.59.190.116/api/v1/website/" + this.props.id, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        console.log(res.data.response[0]);

        let rangeValue = null;
        let rangeType = null;

        if (res.data.response[0].min_visit_time == 1) {
          rangeValue = res.data.response[0].max_visit_time;
          rangeType = "Fixed";
        } else {
          rangeValue = {
            min: res.data.response[0].min_visit_time,
            max: res.data.response[0].max_visit_time
          };
          rangeType = "Random";
        }

        this.setState({
          websiteUrl: res.data.response[0].website_url,
          websiteHits: res.data.response[0].total_required_hits,
          rangeType: rangeType,
          rangeValue: rangeValue,
          fetchingData: false
        });
      });

    axios
      .get("http://13.59.190.116/api/v1/website", {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => console.log(res));
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onUpdateHandler = () => {
    this.props.history.goBack();

    // console.log("hey");
    // let minRange = "";
    // let maxRange = "";

    // if (this.state.rangeType == "Random") {
    //   minRange = this.state.rangeValue.min;
    //   maxRange = this.state.rangeValue.max;
    // } else {
    //   minRange = 0;
    //   maxRange = this.state.rangeValue;
    // }

    // const addWebsiteData = {
    //   website_url: this.state.websiteUrl,
    //   max_visit_time: maxRange,
    //   min_visit_time: minRange,
    //   total_required_hits: Number(this.state.websiteHits)
    // };

    // axios
    //   .post("http://13.59.190.116/api/v1/website", addWebsiteData, {
    //     headers: {
    //       Authorization: "Bearer " + this.props.token
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });

    // axios
    //   .get("http://13.59.190.116/api/v1/website", {
    //     headers: {
    //       Authorization: "Bearer " + this.props.token
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
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

    let form = null;

    if (this.state.fetchingData) {
      form = <LinearProgress />;
    } else {
      form = (
        <form className={classes.formContainer} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="websiteUrl"
                label="Enter Website URL"
                className={classes.textField}
                type="text"
                name="websiteUrl"
                margin="normal"
                variant="outlined"
                fullWidth
                margin="none"
                value={this.state.websiteUrl}
                onChange={this.inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="websiteHits"
                label="Enter Total Website Hits"
                className={classes.textField}
                type="text"
                name="websiteHits"
                margin="normal"
                variant="outlined"
                fullWidth
                margin="none"
                value={this.state.websiteHits}
                onChange={this.inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <label className={classes.label}>Select timing :</label>

              <RadioGroup
                aria-label="position"
                name="position"
                value={this.state.rangeType}
                onChange={event => this.handleRangeType(event.target.value)}
                row
              >
                <FormControlLabel
                  value="Random"
                  control={<Radio color="primary" />}
                  label="Random"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Fixed"
                  control={<Radio color="primary" />}
                  label="Fixed"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} className={classes.rangeSection}>
              <label className={classes.label}>Select Range :</label>
              <div className={classes.rangeSelector}>
                <InputRange
                  maxValue={1520}
                  minValue={0}
                  value={this.state.rangeValue}
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
                onClick={this.onUpdateHandler}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3} />
          </Grid>
        </form>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <h3 className={classes.heading}>Update Website </h3>
          {form}
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.updateRecord.updateId
  };
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(UpdateRecord))
);
