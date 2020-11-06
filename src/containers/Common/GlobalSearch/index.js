import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Popover from "@material-ui/core/Popover";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";
// import Divider from "@material-ui/core/Divider";

import SearchIcon from "@material-ui/icons/Search";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

import NoData from "components/NoData";

import getImageUrl from "utils/getImageUrl";

import { getGlobalSearch } from "./actions";
import useStyles from "./style";

const GlobalSearch = ({ globalSearchData, fetchGlobalSearch, history }) => {
  const classes = useStyles();

  const { globalSearchLoading, globalSearch } = globalSearchData;

  const [globalSearchAnchorEl, setGlobalSearchAnchorEl] = useState(null);
  const [globalSearchText, setGlobalSearchText] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  let mobileSearchPosition = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right"
    }
  };

  if (isMobile) {
    mobileSearchPosition = {
      anchorReference: "anchorPosition",
      anchorPosition: { top: 0, left: 0 },
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right"
      }
    };
  }

  const handleSearchFieldChange = val => {
    setGlobalSearchText(val);
    fetchGlobalSearch(val);
  };

  const searchSkeletonMemo = useMemo(() => {
    return [1, 2].map(item => (
      <div className={classes.skeletonWrapper} key={item}>
        <div className={classes.skeletonAvatar}>
          <Skeleton animation="wave" variant="circle" width={50} height={50} />
        </div>
        <div className={classes.skeletonDescription}>
          <Skeleton
            animation="wave"
            height={12}
            width="70%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation="wave" height={12} width="80%" />
        </div>
      </div>
    ));
  }, []);

  const renderSearchList = () => {
    return (
      <List>
        {(globalSearch || []).map(item => (
          <ListItem
            button
            key={item._id}
            onClick={() => {
              setGlobalSearchAnchorEl(null);
              history.push({
                pathname: `/vendor/${item._id}/site`,
                state: { vendorDetail: item }
              });
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt="search-profile-picture"
                src={getImageUrl(item.photoUri)}
                className={classes.smallAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              classes={{
                primary: classes.listItemText,
                secondary: classes.listItemText
              }}
              primary={item.fullName}
              secondary={
                <span className={classes.searchItemSecondary}>
                  <RoomOutlinedIcon fontSize="small" />
                  <span className={classes.listItemText}>
                    {item.location.place}
                  </span>
                </span>
              }
            />
          </ListItem>
        ))}
        {/* <Divider />
        <ListItem button>
          <ListItemText primary="See all results" />
        </ListItem> */}
      </List>
    );
  };

  const renderSearchBody = () => {
    if (!globalSearchText) {
      return (
        <NoData
          text="Please enter a futsal name"
          wrapperClass={classes.globalSearchNoData}
        />
      );
    }
    if (globalSearchLoading) {
      return searchSkeletonMemo;
    }
    if (globalSearch.length) {
      return renderSearchList();
    }
    return (
      <NoData
        text="Sorry no result found."
        wrapperClass={classes.globalSearchNoData}
      />
    );
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={evt => setGlobalSearchAnchorEl(evt.currentTarget)}
        classes={{ root: classes.iconButtonRoot }}
        className={globalSearchAnchorEl ? "active" : ""}
        disableFocusRipple
        disableRipple
      >
        <SearchIcon style={{ fontSize: 30 }} className={classes.searchIcon} />
      </IconButton>
      <Popover
        id="global-search-popover"
        open={Boolean(globalSearchAnchorEl)}
        anchorEl={globalSearchAnchorEl}
        onClose={() => setGlobalSearchAnchorEl(null)}
        {...mobileSearchPosition}
      >
        <div className={classes.searchContainer}>
          <div className={classes.searchHeader}>
            <IconButton
              className={classes.iconButton}
              aria-label="menu"
              onClick={() => setGlobalSearchAnchorEl(null)}
            >
              <KeyboardBackspaceIcon fontSize="small" />
            </IconButton>
            <InputBase
              classes={{
                root: classes.searchBaseRoot,
                input: classes.searchInputRoot
              }}
              placeholder="Search futsal in App"
              id="global-search-field"
              inputProps={{ "aria-label": "Search App" }}
              autoFocus
              value={globalSearchText}
              onChange={({ target: { value } }) =>
                handleSearchFieldChange(value)
              }
              endAdornment={
                globalSearchText && (
                  <InputAdornment position="end">
                    <Tooltip title="Clear" arrow>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setGlobalSearchText("");
                          document
                            .querySelector("#global-search-field")
                            .focus();
                        }}
                        edge="end"
                        classes={{ root: classes.searchIconButtonRoot }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }
            />
          </div>
          <div className={classes.searchBody}>{renderSearchBody()}</div>
        </div>
      </Popover>
    </>
  );
};

GlobalSearch.propTypes = {
  fetchGlobalSearch: PropTypes.func,
  globalSearchData: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  globalSearchData: state.GlobalSearchReducer
});

const mapDispatchToProps = dispatch => ({
  fetchGlobalSearch: data => dispatch(getGlobalSearch(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(GlobalSearch);
