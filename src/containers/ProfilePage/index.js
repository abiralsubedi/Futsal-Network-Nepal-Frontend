import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import BasicInformation from "containers/BasicInformation";
import ChangePassword from "containers/ChangePassword";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import { getProfileInfo } from "containers/LoginPage/actions";
import useStyles from "./style";

const ProfilePage = ({ fetchProfileInfo, location, history }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const [tabIndexValue, setTabIndexValue] = React.useState(0);

  useEffect(() => {
    fetchProfileInfo();
    if (location.pathname.includes("change-password")) {
      setTabIndexValue(1);
    }
    history.replace("/profile");
  }, []);

  useEffect(() => {
    if (location.pathname.includes("basic-info")) {
      setTabIndexValue(0);
    }
    if (location.pathname.includes("change-password")) {
      setTabIndexValue(1);
    }
    history.replace("/profile");
  }, [location.pathname]);

  const profileTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => setTabIndexValue(newValue),
    items: [
      {
        labelText: "Basic Information",
        labelIcon: <PersonOutlineIcon />,
        content: <BasicInformation />
      },
      {
        labelText: "Change Password",
        labelIcon: <LockOpenIcon />,
        content: <ChangePassword />
      }
    ]
  };

  return (
    <Wrapper>
      <div className={classes.profileContainer}>
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.pageTitle}
        >
          Profile Page
        </Typography>
        {isMobile ? (
          <HorizontalTabs {...profileTabContent} height="40rem" />
        ) : (
          <VerticalTabs {...profileTabContent} height="35rem" />
        )}
      </div>
    </Wrapper>
  );
};

ProfilePage.propTypes = {
  fetchProfileInfo: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchProfileInfo: () => dispatch(getProfileInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
