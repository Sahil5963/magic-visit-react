import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  content: {
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "1rem 2rem",
    minHeight: "90%"
  },

  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class WebsiteList extends Component {
  createData = (name, calories, fat, carbs, protein, actions) => {
    return { name, calories, fat, carbs, protein, actions };
  };

  render() {
    const { classes } = this.props;
    const rows = [
      this.createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      this.createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      this.createData("Eclair", 262, 16.0, 24, 6.0),
      this.createData("Cupcake", 305, 3.7, 67, 4.3),
      this.createData("Gingerbread", 356, 16.0, 49, 3.9)
    ];

    return (
      <div className={classes.content}>
        <h3 className={classes.heading}>Websites List</h3>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <span onClick={console.log(row.name)}>Actions</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(WebsiteList);
