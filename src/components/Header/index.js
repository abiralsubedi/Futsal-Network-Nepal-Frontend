import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter, NavLink, Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import MenuIcon from "@material-ui/icons/Menu";

import GlobalSearch from "containers/Common/GlobalSearch";
import ProfileMenu from "components/ProfileMenu";

import { ThemeContext } from "context/themeContext";
import GetCommonIcon from "utils/getCommonIcon.js";

import useStyles from "./style";

const userLinks = [
  {
    value: "Home",
    url: "/",
    icon: <GetCommonIcon type="filledHome" />
  },
  {
    value: "Futsal",
    url: "/vendor",
    icon: <GetCommonIcon type="filledFootball" />
  }
];

const vendorLinks = [
  {
    value: "Home",
    url: "/",
    icon: <GetCommonIcon type="filledHome" />
  },
  {
    value: "Schedule",
    url: "/schedule",
    icon: <GetCommonIcon type="filledSchedule" />
  },
  {
    value: "Site",
    url: "/site",
    icon: <GetCommonIcon type="filledFootball" />
  }
];

const adminLinks = [
  {
    value: "Home",
    url: "/",
    icon: <GetCommonIcon type="filledHome" />
  },
  {
    value: "Futsal",
    url: "/vendor",
    icon: <GetCommonIcon type="filledFootball" />
  },
  {
    value: "People",
    url: "/people",
    icon: <GetCommonIcon type="filledProfile" />
  }
];

const Header = ({ globalData }) => {
  const classes = useStyles();

  const { isMobile } = useContext(ThemeContext);
  const {
    profile: { role }
  } = globalData;

  const [navBarDrawerShow, setNavBarDrawerShow] = useState(false);

  const toggleNavBarDrawer = event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavBarDrawerShow(true);
  };

  const renderNavBar = () => {
    let navBarLinks;
    if (role === "User") {
      navBarLinks = userLinks;
    } else if (role === "Vendor") {
      navBarLinks = vendorLinks;
    } else if (role === "Admin") {
      navBarLinks = adminLinks;
    }

    return navBarLinks.map((link, index) => (
      <li key={link.value}>
        <NavLink
          to={link.url}
          activeClassName="active"
          exact={link.value === "Home"}
          id={`navbar-item-${index}`}
          onClick={() => setNavBarDrawerShow(false)}
        >
          {link.icon}
          <span>{link.value}</span>
        </NavLink>
      </li>
    ));
  };

  return (
    <div>
      <AppBar position="static" classes={{ root: classes.appBarRoot }}>
        <Toolbar
          classes={{
            root: classes.toolBarRoot,
            gutters: classes.toolBarGutters
          }}
          elevation={3}
        >
          <div className={classes.primaryHeaderBar}>
            <div className={classes.logoBar}>
              {isMobile ? (
                <IconButton
                  aria-label="menu-side-bar"
                  aria-controls="menu-side-bar"
                  aria-haspopup="true"
                  onClick={toggleNavBarDrawer}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Link to="/">
                  <img
                    src="https://image.flaticon.com/icons/svg/2965/2965279.svg"
                    alt="logo"
                    style={{ width: "3rem" }}
                  />
                </Link>
              )}
            </div>
            {!isMobile && (
              <div className={classes.primaryNavBar}>
                <ul className={classes.navLinkList}>{renderNavBar()}</ul>
              </div>
            )}
            <div className={classes.profileMenuBar}>
              {role !== "Vendor" && <GlobalSearch />}
              <ProfileMenu />
            </div>
          </div>
        </Toolbar>
        <SwipeableDrawer
          open={navBarDrawerShow}
          onClose={() => setNavBarDrawerShow(false)}
          onOpen={() => setNavBarDrawerShow(true)}
          disableSwipeToOpen={!isMobile}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerLogo}>
            <img
              src="https://image.flaticon.com/icons/svg/2965/2965279.svg"
              alt="logo"
              style={{ width: "3rem" }}
            />
          </div>
          <ul className={classes.navLinkList}>{renderNavBar()}</ul>
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  globalData: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Header);
