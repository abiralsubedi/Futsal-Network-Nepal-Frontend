import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";

import DeleteIcon from "@material-ui/icons/Delete";

import Button from "components/Button";
import NoData from "components/NoData";
import Loader from "components/Loader";
import TextField from "components/TextField";

import { getUserList, clearUserListData } from "./actions";
import useStyles from "./style";

const PeopleUserPage = ({
  fetchUserList,
  onClearUserListData,
  peopleUserData
}) => {
  const classes = useStyles();

  const {
    userListLoading,
    userListData: { items: userList, searchCount }
  } = peopleUserData;

  const pageSize = 8;

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    onClearUserListData();
    makeUserSearch({});
  }, []);

  const makeUserSearch = ({ resetText, updatedPage }) => {
    fetchUserList({
      searchText: resetText ? "" : searchText,
      currentPage: updatedPage || currentPage,
      pageSize
    });
    setSelectedRow([]);
  };

  const selectedRowCount = selectedRow.length;
  const itemsCount = userList && userList.length;
  const paginationSize = Math.ceil(searchCount / pageSize);

  const handleResetSearch = () => {
    setSearchText("");
    setCurrentPage(1);
    makeUserSearch({ resetText: true, updatedPage: 1 });
  };

  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
    makeUserSearch({ updatedPage: page });
  };

  const handleUserSearch = e => {
    e.preventDefault();
    setCurrentPage(1);
    makeUserSearch({ updatedPage: 1 });
  };

  const StyledTableCell = withStyles(theme => ({
    head: {},
    body: {
      fontSize: "0.95rem"
    }
  }))(TableCell);

  const handleRowBoxClick = (event, id) => {
    const selectedIndex = selectedRow.indexOf(id);
    const newSelected = JSON.parse(JSON.stringify(selectedRow));
    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRow(newSelected);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = (userList || []).map(item => item._id);
      setSelectedRow(newSelected);
      return;
    }
    setSelectedRow([]);
  };

  const isRowSelected = id => selectedRow.indexOf(id) !== -1;

  const tableHeader = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "emailAddress" },
    { label: "Location", key: "location" }
  ];

  return (
    <div className={classes.creditPageContent}>
      <form onSubmit={handleUserSearch}>
        <Grid container spacing={3} alignItems="center">
          <Grid item sm={4} xs={12}>
            <TextField
              id="search-text"
              label="Search by Name"
              value={searchText}
              handleChange={val => setSearchText(val)}
              autoFocus
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={userListLoading}
              buttonRootClass={classes.tableFilterButton}
              buttonText="Search"
              type="submit"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={userListLoading}
              buttonRootClass={classes.tableFilterButton}
              buttonText="Reset"
              onClick={handleResetSearch}
              size="small"
            />
          </Grid>
        </Grid>
      </form>
      <Toolbar
        className={`${classes.tableToolbar} ${selectedRowCount && "highlight"}`}
      >
        <Typography
          className={classes.tableTitle}
          variant="h6"
          id="tableTitle"
          component="div"
          color="textSecondary"
        >
          {selectedRowCount ? `${selectedRowCount} selected` : "User Table"}
        </Typography>

        {!!selectedRowCount && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRowCount > 0 && selectedRowCount < itemsCount
                  }
                  checked={
                    selectedRowCount > 0 && selectedRowCount === itemsCount
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all users" }}
                  color="primary"
                />
              </TableCell>
              {(tableHeader || []).map(headCell => (
                <TableCell
                  key={headCell.label}
                  align={headCell.align || "left"}
                  classes={{ head: classes.tableHead }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!(userList || []).length && (
              <TableRow>
                <TableCell colSpan={4}>
                  {userListLoading && (
                    <Loader wrapperClass={classes.loadingWrapper} />
                  )}
                  {!userListLoading && (
                    <NoData text="Sorry, there is no matching user." />
                  )}
                </TableCell>
              </TableRow>
            )}
            {!!(userList || []).length &&
              (userList || []).map(row => {
                const isSelected = isRowSelected(row._id);
                return (
                  <TableRow
                    key={row._id}
                    hover
                    selected={isSelected}
                    classes={{ selected: classes.selectedRow }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        inputProps={{ "aria-labelledby": row._id }}
                        color="primary"
                        onChange={event => handleRowBoxClick(event, row._id)}
                      />
                    </TableCell>
                    {(tableHeader || []).map(col => (
                      <StyledTableCell>{row[col.key]}</StyledTableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
          {paginationSize > 1 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={classes.paginationWrapper}>
                    <Pagination
                      page={currentPage}
                      onChange={handlePaginationChange}
                      count={paginationSize}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

PeopleUserPage.propTypes = {
  peopleUserData: PropTypes.object,
  fetchUserList: PropTypes.func,
  onClearUserListData: PropTypes.func
};

const mapStateToProps = state => ({
  peopleUserData: state.PeopleUserPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchUserList: data => dispatch(getUserList(data)),
  onClearUserListData: () => dispatch(clearUserListData())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PeopleUserPage);
