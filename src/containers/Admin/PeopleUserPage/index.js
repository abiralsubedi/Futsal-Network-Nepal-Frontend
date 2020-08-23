import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import TableFilter from "components/TableFilter";
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

  const handleUserSearch = e => {
    e.preventDefault();
    setCurrentPage(1);
    makeUserSearch({ updatedPage: 1 });
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

  const tableHeader = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "emailAddress" },
    { label: "Location", key: "location" }
  ];

  const actions = [{ type: "Edit", pushUrl: "/people/vendors/edit" }];

  return (
    <div className={classes.creditPageContent}>
      <TableFilter
        textField={[
          {
            value: searchText,
            handleChange: val => setSearchText(val)
          }
        ]}
        contentLoading={userListLoading}
        handleSearch={handleUserSearch}
        handleReset={handleResetSearch}
      />
      <PeopleTable
        tableHeader={tableHeader}
        tableBody={userList || []}
        tableBodyLoading={userListLoading}
        pageSize={pageSize}
        searchCount={searchCount}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
        actions={actions}
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
