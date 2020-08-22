import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Grid from "@material-ui/core/Grid";

import Button from "components/Button";
import TextField from "components/TextField";
import PeopleTable from "components/PeopleTable";

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
  };

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
              disabled={userListLoading || !searchText}
              buttonRootClass={classes.tableFilterButton}
              buttonText="Search"
              type="submit"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={userListLoading || !searchText}
              buttonRootClass={classes.tableFilterButton}
              buttonText="Reset"
              onClick={handleResetSearch}
              size="small"
            />
          </Grid>
        </Grid>
      </form>
      <PeopleTable
        tableHeader={tableHeader}
        tableBody={userList || []}
        tableBodyLoading={userListLoading}
        pageSize={pageSize}
        searchCount={searchCount}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
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
