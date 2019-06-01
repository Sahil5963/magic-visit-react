import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import color from "@material-ui/core/colors/lightGreen";

import DataCard from "../../components/DataCard/DataCard";
import Chart from "../../components/Chart/Chart";

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

class Dashboard extends Component {
  state = {
    chartData: {}
  };

  componentWillMount() {
    this.getChartData();
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <DataCard
                  primary
                  primaryHeading="Active Users"
                  secondaryHeading="45554"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DataCard
                  primaryHeading="Users This Week"
                  secondaryHeading="4354"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DataCard
                  primaryHeading="Users This Month"
                  secondaryHeading="34675"
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
    );
  }
}

export default withStyles(styles)(Dashboard);
