import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import color from "@material-ui/core/colors/lightGreen";

import DataCard from "../../components/DataCard/DataCard";
import Chart from "../../components/Chart/Chart";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { connect } from "react-redux";

import io from "socket.io-client";

import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "2rem",
    overflow: "hidden"
  },
  card: {
    background: "#fff",
    padding: "2rem"
  },
  cardPrimary: {
    background: "#2DE6AA",
    color: "red"
  },
  chartContainer: {
    height: "400px"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006FFF" }
  }
});

class Dashboard extends Component {
  state = {
    chartData: {},
    activeUsers: null,
    totalWebsites: null,
    totalHits: null,
    fetchingTotalWebsites: false,
    fetchingTotalHits: false,
    fetchingActiveUsers: false
  };

  componentWillUpdate() {
    console.log("Component Will Update");
  }

  componentDidMount() {
    const socket = io("http://13.59.190.116:3000");

    this.setState({
      fetchingActiveUsers: true
    });

    socket.on("connected", function(data) {
      console.log(data);
      socket.emit("getActiveUser", { type: "getActiveUser" });
    });

    socket.on("showActiveUser", data => {
      console.log(data); //

      this.setState({
        activeUsers: data.visitor_count,
        fetchingActiveUsers: false
      });
    });
  }

  componentWillMount() {
    this.getChartData();

    this.setState({ fetchingTotalWebsites: true, fetchingTotalHits: true });

    axios
      .get("http://13.59.190.116/api/v1/fetchTotalWebsites", {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          totalWebsites: res.data.response.count,
          fetchingTotalWebsites: false
        });
      });

    axios
      .get("http://13.59.190.116/api/v1/fetchTotalHits", {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          totalHits: res.data.response.count,
          fetchingTotalHits: false
        });
      });
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Users",
            data: [
              617594,
              181045,
              153060,
              106519,
              105162,
              95072,
              105162,
              95072,
              105162,
              95072
            ],
            backgroundColor: "rgba(0, 111, 255, 0.4)",
            borderColor: "rgba(0, 111, 255, 1)",
            borderWidth: "4",
            pointBackgroundColor: "rgba(0, 111, 255, 1)",
            // pointBorderColor
            // pointBorderWidth
            pointHitRadius: "14",
            pointRadius: "4"
          }
        ]
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <DataCard
                    primary
                    primaryHeading="Active Users"
                    secondaryHeading={
                      this.state.fetchingActiveUsers ? (
                        <CircularProgress color="red" />
                      ) : (
                        this.state.activeUsers
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DataCard
                    primaryHeading="Total Websites"
                    secondaryHeading={
                      this.state.fetchingTotalWebsites ? (
                        <CircularProgress />
                      ) : (
                        this.state.totalWebsites
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DataCard
                    primaryHeading="Users This Month"
                    secondaryHeading={
                      this.state.fetchingTotalHits ? (
                        <CircularProgress />
                      ) : (
                        this.state.totalHits
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} className={classes.chartContainer}>
                  <Chart chartData={this.state.chartData} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(Dashboard)
);
