import React, { useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

import GameHour from "containers/Vendor/GameHour";
import Fields from "containers/Vendor/Fields";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const SchedulePage = ({ location, history, globalData, match }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const {
    profile: { role }
  } = globalData;
  const { vendorId } = match.params;

  const [tabIndexValue, setTabIndexValue] = React.useState(0);
  const [vendorChanged, setVendorChanged] = React.useState(false);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (location.pathname.includes("game-hour")) {
      setTabIndexValue(0);
    }
    if (location.pathname.includes("fields")) {
      setTabIndexValue(1);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setVendorChanged(true);
      setTimeout(() => setVendorChanged(false), 0);
    }
  }, [vendorId]);

  const getPushPathname = val => {
    switch (val) {
      case 0:
        return "/schedule/game-hour";

      case 1:
        return "/schedule/fields";

      default:
    }
  };

  const scheduleTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => {
      if (tabIndexValue !== newValue) {
        let pathname = getPushPathname(newValue);
        if (role === "Admin" && vendorId) {
          pathname = `/vendor/${vendorId}${pathname}`;
        }
        history.push(pathname);
      }
    },
    items: [
      {
        labelText: "Game Hour",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <GameHour />
      },
      {
        labelText: "Fields",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <Fields />
      }
    ]
  };

  const getTabContent = () => {
    if (vendorChanged) {
      return <span />;
    }
    if (isMobile) {
      return (
        <HorizontalTabs
          {...scheduleTabContent}
          customRootClass={classes.customHorizontalTabHeight}
        />
      );
    }
    return (
      <VerticalTabs
        {...scheduleTabContent}
        customRootClass={classes.customVerticalTabHeight}
      />
    );
  };

  return (
    <Wrapper>
      <div className={classes.profileContainer}>
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.pageTitle}
        >
          Schedule Page
        </Typography>
        {getTabContent()}
      </div>
    </Wrapper>
  );
};

SchedulePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  globalData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(SchedulePage);
