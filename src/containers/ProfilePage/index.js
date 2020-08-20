import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import BasicInformation from "containers/BasicInformation";
import ChangePassword from "containers/ChangePassword";
import CreditPage from "containers/CreditPage";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const ProfilePage = ({ location, history, globalData }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const {
    profile: { role }
  } = globalData;

  const [tabIndexValue, setTabIndexValue] = React.useState(0);

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
  }, [location.pathname]);

  const isUser = role === "User";

  const profileTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => {
      setTabIndexValue(newValue);
      history.replace("/profile");
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
  globalData: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
