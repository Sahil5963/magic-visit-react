import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import purple from "@material-ui/core/colors/purple";

import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles(theme => ({
  head: {
    padding: "12px 6px 12px 6px"
  },
  body: {
    fontSize: 12,
    padding: "12px 6px 12px 6px"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {}
}))(TableRow);

const TableContainer = styled.div`
  padding: 1.2rem 1rem;
`;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID"
  },
  {
    id: "websiteUrl",
    numeric: true,
    disablePadding: false,
    label: "Website URL"
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created At"
  },
  {
    id: "totalRequiredHits",
    numeric: true,
    disablePadding: false,
    label: "Total Required Hits"
  },
  {
    id: "minVisitTime",
    numeric: true,
    disablePadding: false,
    label: "Min Visit Time"
  },
  {
    id: "maxVisitTime",
    numeric: true,
    disablePadding: false,
    label: "Max Visit Time"
  },
  {
    id: "totalHits",
    numeric: true,
    disablePadding: false,
    label: "Total Hits"
  },
  {
    id: "updatedAt",
    numeric: true,
    disablePadding: false,
    label: "Updated At"
  }
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headRows.map(row => (
          <StyledTableCell
            key={row.id}
            align="left"
            padding="default"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell padding="default" align="center">
          Actions
        </StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Website List
        </Typography>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#006FFF" } // Purple and green play nicely together.
  }
});

class WebsiteList extends Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    listData: [],
    fetchingData: false,
    deleted: false
  };

  componentDidUpdate() {
    console.log("did update");
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.deleted != nextState.deleted) {
      console.log("geeting After Deleting");

      let websiteListData = [];

      this.setState({
        fetchingData: true
      });

      axios
        .get("http://13.59.190.116/api/v1/website", {
          headers: {
            Authorization: "Bearer " + this.props.token
          }
        })
        .then(res => {
          console.log(res);

          websiteListData = [
            {
              created_at: "2019-05-29 18:07:55",
              id: 1,
              max_visit_time: 882,
              min_visit_time: 0,
              total_hits: null,
              total_required_hits: 10000,
              updated_at: "2019-06-01 06:07:05",
              website_url: "https://www.ding.com"
            }
          ];

          this.setState({
            listData: websiteListData,
            fetchingData: false,
            deleted: false
          });
        });
    }
  }

  componentDidMount() {
    console.log("did mount");
  }

  componentWillMount() {
    let websiteListData = [];

    this.setState({
      fetchingData: true
    });

    axios
      .get("http://13.59.190.116/api/v1/website", {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        websiteListData = [...res.data.response];

        this.setState({
          listData: websiteListData,
          fetchingData: false
        });
      });
  }

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({
      order: isDesc ? "asc" : "desc",
      orderBy: property
    });
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: +event.target.value
    });
  };

  onDeleteHandler = id => {
    console.log("Deleting");

    this.setState({
      fetchingData: true
    });

    axios
      .get(
        "http://13.59.190.116/api/v1/website/" + id,
        { _method: "DELETE" },
        {
          headers: {
            Authorization: "Bearer " + this.props.token
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({
          deleted: true,
          fetchingData: false
        });

        console.log("Deleting Finish");
      });
  };

  onUpdateHandler = id => {
    this.props.onUpdateRecord(id);

    this.props.history.push("/update-record");
  };

  render() {
    let renderData = null;

    if (this.state.fetchingData) {
      renderData = <LinearProgress variant="query" />;
    }

    const isSelected = name => this.state.selected.indexOf(name) !== -1;

    // const emptyRows =
    //   this.state.rowsPerPage -
    //   Math.min(
    //     this.state.rowsPerPage,
    //     this.state.listData.length - this.state.page * this.state.rowsPerPage
    //   );

    return (
      <ThemeProvider theme={theme}>
        <div style={{ overflow: "auto" }}>
          <Paper>
            <TableContainer>
              <EnhancedTableToolbar />
              {renderData}
              <div>
                <Table aria-labelledby="tableTitle" size="small">
                  <EnhancedTableHead
                    numSelected={this.state.selected.length}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    onRequestSort={this.handleRequestSort}
                    rowCount={this.state.listData.length}
                  />

                  <TableBody>
                    {stableSort(
                      this.state.listData,
                      getSorting(this.state.order, this.state.orderBy)
                    )
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map(row => {
                        const isItemSelected = isSelected(row.name);
                        return (
                          <StyledTableRow
                            hover
                            onClick={event => this.handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <StyledTableCell
                              padding="4"
                              component="th"
                              scope="row"
                              padding="default"
                            >
                              {row.id}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.website_url}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.created_at}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.total_required_hits}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.min_visit_time}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.max_visit_time}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.total_hits}
                            </StyledTableCell>
                            <StyledTableCell padding="4" align="left">
                              {row.updated_at}
                            </StyledTableCell>
                            <StyledTableCell padding="4">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around"
                                }}
                              >
                                <IconButton
                                  aria-label="Delete"
                                  style={{
                                    color: "#F84444",
                                    background: "#FFE9E9"
                                  }}
                                  onClick={() => this.onDeleteHandler(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="Edit"
                                  style={{
                                    color: "#0055FF",
                                    background: "#E9F1FF"
                                  }}
                                  onClick={() => this.onUpdateHandler(row.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <StyledTableRow style={{ height: 49 * emptyRows }}>
                        <StyledTableCell colSpan={6} />
                      </StyledTableRow>
                    )} */}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.state.listData.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page"
                }}
                onChangePage={this.handleChangePage.bind(this)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
              />
            </TableContainer>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateRecord: id => dispatch(actions.updateRecord(id))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(WebsiteList)
);
