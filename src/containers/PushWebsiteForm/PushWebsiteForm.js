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

import "react-input-range/lib/css/index.css";

import InputRange from "react-input-range";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "1rem 2rem",
    minHeight: "90%"
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

class PushWebsiteForm extends Component {
  state = {
    value: { min: 2, max: 610 }
  };

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <h3 className={classes.heading}>Push website to new URL </h3>

          <form className={classes.formContainer} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  margin="none"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  margin="none"
                />
              </Grid>
              <Grid item xs={12}>
                <label className={classes.label}>Select timing :</label>

                <RadioGroup
                  aria-label="position"
                  name="position"
                  // value={value}
                  // onChange={handleChange}
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
                    value={this.state.value}
                    onChange={value => this.setState({ value })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={(classes.button, classes.submitButton)}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  size="large"
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

export default withStyles(styles)(PushWebsiteForm);
