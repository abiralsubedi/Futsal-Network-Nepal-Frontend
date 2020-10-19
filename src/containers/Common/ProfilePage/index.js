import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";

import BasicInformation from "containers/Common/BasicInformation";
import ChangePassword from "containers/Common/ChangePassword";
import CreditPage from "containers/User/CreditPage";
import BookingDetailPage from "containers/User/BookingDetailPage";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { getProfileInfo } from "containers/LoginPage/actions";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const ProfilePage = ({ location, history, globalData, fetchProfileInfo }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const {
    profile: { role }
  } = globalData;

  const isUser = role === "User";

  const [tabIndexValue, setTabIndexValue] = React.useState(0);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    if (location.pathname.includes("basic-info")) {
      setTabIndexValue(0);
    }
    if (location.pathname.includes("change-password")) {
      setTabIndexValue(1);
    }
    if (location.pathname.includes("credit") && isUser) {
      setTabIndexValue(2);
    }
    if (location.pathname.includes("booking") && isUser) {
      setTabIndexValue(3);
    }
  }, [location.pathname]);

  const pushPathname = val => {
    switch (val) {
      case 0:
        return history.push("/profile/basic-info");

      case 1:
        return history.push("/profile/change-password");

      case 2:
        return history.push("/profile/credit");

      case 3:
        return history.push("/profile/booking");

      default:
    }
  };

  const profileTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => {
      if (tabIndexValue !== newValue) {
        pushPathname(newValue);
      }
    },
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
      },
      ...(isUser
        ? [
            {
              labelText: "Credit",
              labelIcon: <CreditCardIcon />,
              content: <CreditPage />
            },
            {
              labelText: "Booking",
              labelIcon: <SportsSoccerIcon />,
              content: <BookingDetailPage />
            }
          ]
        : [])
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
          <HorizontalTabs
            {...profileTabContent}
            customRootClass={classes.customHorizontalTabHeight}
          />
        ) : (
          <VerticalTabs
            {...profileTabContent}
            customRootClass={classes.customVerticalTabHeight}
          />
        )}
      </div>
    </Wrapper>
  );
};

ProfilePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  globalData: PropTypes.object,
  fetchProfileInfo: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  fetchProfileInfo: () => dispatch(getProfileInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
