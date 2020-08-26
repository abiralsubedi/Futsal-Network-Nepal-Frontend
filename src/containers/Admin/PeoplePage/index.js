import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import PeopleUserPage from "containers/Admin/PeopleUserPage";
import ChangePassword from "containers/ChangePassword";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const PeoplePage = ({ location, history }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const [tabIndexValue, setTabIndexValue] = React.useState(0);

  useEffect(() => {
    if (location.pathname.includes("users")) {
      setTabIndexValue(0);
    }
    if (location.pathname.includes("vendors")) {
      setTabIndexValue(1);
    }
  }, [location.pathname]);

  const pushPathname = val => {
    switch (val) {
      case 0:
        return history.push("/people/users");

      case 1:
        return history.push("/people/vendors");

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
        labelText: "User",
        labelIcon: <PersonOutlineIcon />,
        content: <PeopleUserPage />
      },
      {
        labelText: "Vendor",
        labelIcon: <PersonOutlineIcon />,
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
          People Page
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

PeoplePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  globalData: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PeoplePage);
