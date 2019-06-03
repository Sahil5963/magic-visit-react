import React, { Component } from "react";
import classes from "./Auth.module.css";
import Logo from "../../components/Logo/Logo";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006FFF"
    }
  }
});

class Auth extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    isSignup: true,
    redirect: false
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClickShowPassword = () => {
    this.setState(prevState => {
      return {
        showPassword: !prevState.showPassword
      };
    });
  };

  submitHandler = e => {
    console.log("form submit");
    e.preventDefault();

    this.props.onAuth(
      this.state.email,
      this.state.password,
      this.state.isSignup
    );
  };

  render() {
    let form = (
      <form className={classes.Form} noValidate autoComplete="off">
        <TextField
          id="email"
          name="email"
          label="Email"
          className={classes.InputField}
          value={this.state.email}
          onChange={e => this.inputChangeHandler(e)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="password"
          variant="outlined"
          name="password"
          label="Password"
          className={classes.InputField}
          type={this.state.showPassword ? "text" : "password"}
          value={this.state.password}
          onChange={e => this.inputChangeHandler(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={e => this.handleClickShowPassword(e)}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          className={classes.SubmitButton}
          onClick={this.submitHandler}
          // onClick={this.setRedirect}
        >
          Login
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = (
        <div>
          <CircularProgress
            className={classes.Spinner}
            color="primary"
            thickness={5}
            size={60}
          />
        </div>
      );
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <div className={classes.ErrorContainer}>
          <span className={classes.ErrorLabel}> Login Failed : </span>
          <span className={classes.ErrorMessage}>
            Check your Email and Password
          </span>
        </div>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.AuthOuter}>
          {authRedirect}
          <div className={classes.Auth}>
            <div className={classes.Logo}>
              <Logo color1="#232931" color2="#2DE6AA" height="80px" />
            </div>
            {errorMessage}
            {form}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
