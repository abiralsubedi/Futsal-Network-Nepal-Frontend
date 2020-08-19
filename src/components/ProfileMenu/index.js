import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { ThemeContext } from "context/themeContext";

import { IOSSwitch } from "components/Common";

import getImageUrl from "utils/getImageUrl";

import { logoutSuccess } from "containers/LoginPage/actions";

import useStyles from "./style";

const ProfileMenu = ({ history, postLogout, globalData }) => {
  const classes = useStyles();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const { profile } = globalData;

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const userPhoto = getImageUrl(profile.photoUri);

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={evt => setProfileMenuAnchorEl(evt.currentTarget)}
        classes={{ root: classes.iconButtonRoot }}
        className={profileMenuAnchorEl ? "active" : ""}
        disableFocusRipple
        disableRipple
      >
        <Avatar
          alt="header-profile-picture"
          src={userPhoto}
          className={classes.smallAvatar}
        />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={profileMenuAnchorEl}
        keepMounted
        open={Boolean(profileMenuAnchorEl)}
        onClose={() => setProfileMenuAnchorEl(null)}
        classes={{ paper: classes.profileMenuPaper }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem
          onClick={() => {
            setProfileMenuAnchorEl(null);
            history.push("/profile/basic-info");
          }}
          classes={{
            root: classes.menuItemRoot
          }}
          className="first-menu-item"
          disableRipple
        >
          <div>
            <Avatar
              alt="header-profile-picture"
              src={userPhoto}
              className={classes.largeAvatar}
            />
          </div>
          <div className={classes.menuDetailItem}>
            <div>{profile.fullName}</div>
            <div>See your profile</div>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDarkMode(prev => !prev);
            localStorage.setItem("darkMode", !darkMode);
          }}
          classes={{
            root: classes.menuItemRoot
          }}
          disableRipple
        >
          <div className={classes.menuItemLeft}>
            <Brightness4Icon />
            <Typography>Dark Mode</Typography>
          </div>
          <div>
            <FormControlLabel
              control={
                <IOSSwitch checked={darkMode} name="screen-mode-switch" />
              }
            />
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            postLogout();
          }}
          classes={{
            root: classes.menuItemRoot
          }}
          disableRipple
        >
          <div className={classes.menuItemLeft}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

ProfileMenu.propTypes = {
  postLogout: PropTypes.func,
  globalData: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  postLogout: () => dispatch(logoutSuccess())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(ProfileMenu);
