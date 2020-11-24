import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import AddUser from "containers/Admin/AddUser";

import TableFilter from "components/TableFilter";
import PeopleTable from "components/PeopleTable";

import { getUserList, clearUserListData } from "./actions";
import useStyles from "./style";

const PeopleUserPage = ({
  fetchUserList,
  onClearUserListData,
  peopleUserData,
  location,
  history
}) => {
  const classes = useStyles();

  const {
    userListLoading,
    userListData: { items: userList, searchCount }
  } = peopleUserData;

  const pageSize = 8;

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const singleUserInfo =
    location.pathname.includes("add") || location.pathname.includes("edit");

  useEffect(() => {
    onClearUserListData();
    makeUserSearch({});
  }, []);

  const getUrlParam = (text, pageNum) => {
    const textQuery = `searchText=${encodeURIComponent(text)}`;
    const pageQuery = `&currentPage=${pageNum}`;
    const sizeQuery = `&pageSize=${pageSize}`;

    return textQuery + pageQuery + sizeQuery;
  };

  const makeUserSearch = ({ resetText, pageNum }) => {
    const updatedText = resetText ? "" : searchText;
    const updatedPage = pageNum || currentPage;
    setSearchText(updatedText);
    setCurrentPage(updatedPage);
    fetchUserList(getUrlParam(updatedText, updatedPage));
  };

  const handleUserSearch = e => {
    e.preventDefault();
    makeUserSearch({ pageNum: 1 });
  };

  const handleResetSearch = () => {
    makeUserSearch({ resetText: true, pageNum: 1 });
  };

  const handlePaginationChange = (event, page) => {
    makeUserSearch({ pageNum: page });
  };

  const tableHeader = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "emailAddress" },
    { label: "Phone", key: "phone" }
  ];

  const actions = [
    {
      type: "Edit",
      handleClick: item => history.push(`/people/users/edit/${item._id}`)
    }
  ];

  const addButton = {
    label: "Add User",
    handleClick: () => history.push("/people/users/add")
  };

  const peopleTableMemo = useMemo(() => {
    const paginationSize = Math.ceil(searchCount / pageSize);
    return (
      <PeopleTable
        noDataText="Sorry, There is no matching user."
        tableHeader={tableHeader}
        tableBody={userList || []}
        tableBodyLoading={userListLoading}
        paginationSize={paginationSize}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
        actions={actions}
        addButton={addButton}
        noMultiSelect
      />
    );
  }, [userListLoading]);

  return (
    <div className={classes.peopleUserPageContent}>
      {singleUserInfo && (
        <>
          <div className={classes.backTextWrapper}>
            <Typography
              variant="body1"
              onClick={() => history.push("/people/users")}
              className={classes.backText}
            >
              <KeyboardBackspaceIcon fontSize="small" /> Back to Listing
            </Typography>
          </div>
          <AddUser />
        </>
      )}
      {!singleUserInfo && (
        <>
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
          {peopleTableMemo}
        </>
      )}
    </div>
  );
};

PeopleUserPage.propTypes = {
  peopleUserData: PropTypes.object,
  fetchUserList: PropTypes.func,
  onClearUserListData: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  peopleUserData: state.PeopleUserPageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchUserList: data => dispatch(getUserList(data)),
  onClearUserListData: () => dispatch(clearUserListData())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(PeopleUserPage);
