import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";

import { IOSSwitch } from "components/Common";
import { logoutSuccess } from "containers/LoginPage/actions";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const userLinks = [
  { value: "Home", url: "/", icon: <HomeIcon /> },
  { value: "Profile", url: "/profile", icon: <PersonIcon /> }
];

const Header = props => {
  const classes = useStyles();

  const { darkMode, setDarkMode, isMobile } = useContext(ThemeContext);

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
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
    return userLinks.map((link, index) => (
      <li key={link.value}>
        <NavLink
          to={link.url}
          activeClassName="active"
          exact={link.value === "Home"}
          id={`navbar-item-${index}`}
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
        <Toolbar classes={{ root: classes.toolBarRoot }}>
          <div className={classes.primaryHeaderBar}>
            <div className={classes.logoBar}>
              {isMobile ? (
                <IconButton
                  aria-label="menu-side-bar"
                  aria-controls="menu-side-bar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={toggleNavBarDrawer}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/2965/2965279.svg"
                  alt="logo"
                  style={{ width: "3rem" }}
                />
              )}
            </div>
            {!isMobile && (
              <div className={classes.primaryNavBar}>
                <ul className={classes.navLinkList}>{renderNavBar()}</ul>
              </div>
            )}
            <div className={classes.profileMenuBar}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={evt => setProfileMenuAnchorEl(evt.currentTarget)}
                classes={{ root: classes.iconButtonRoot }}
                className={profileMenuAnchorEl ? "active" : ""}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={profileMenuAnchorEl}
                keepMounted
                open={Boolean(profileMenuAnchorEl)}
                onClose={() => setProfileMenuAnchorEl(null)}
                classes={{ paper: classes.profileMenuPaper }}
              >
                <MenuItem
                  onClick={() => {
                    localStorage.setItem("darkMode", !darkMode);
                    setDarkMode(prev => !prev);
                  }}
                  classes={{
                    root: classes.menuItemRoot
                  }}
                >
                  <div className={classes.menuItemLeft}>
                    <Brightness4Icon />
                    <Typography>Dark Mode</Typography>
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={darkMode}
                          name="screen-mode-switch"
                        />
                      }
                    />
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    props.postLogout();
                  }}
                  classes={{
                    root: classes.menuItemRoot
                  }}
                >
                  <div className={classes.menuItemLeft}>
                    <ExitToAppIcon />
                    <Typography>Logout</Typography>
                  </div>
                </MenuItem>
              </Menu>
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
  postLogout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  postLogout: () => dispatch(logoutSuccess())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Header);
