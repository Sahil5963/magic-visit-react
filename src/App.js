import React, { Component } from "react";
import "./App.css";
import Auth from "./containers/Auth/Auth";
import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Dashboard from "./containers/Dashboard/Dashboard";
import PushWebsiteForm from "./containers/PushWebsiteForm/PushWebsiteForm";
import WebsiteList from "./containers/WebsiteList/WebsiteList";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    console.log(this.props.location.pathname);
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Layout>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/push-website-form" component={PushWebsiteForm} />
              <Route path="/website-list" component={WebsiteList} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </>
      );
    }

    return <div className="App">{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
