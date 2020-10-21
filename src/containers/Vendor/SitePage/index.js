import React, { useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

import Description from "containers/Vendor/Description";
import Gallery from "containers/Vendor/Gallery";
import ReviewPage from "containers/Vendor/ReviewPage";
import BookingPage from "containers/Vendor/BookingPage";
import MapPage from "containers/Vendor/MapPage";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import useStyles from "./style";

const SitePage = ({ location, history, globalData, match }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const {
    profile: { role }
  } = globalData;
  const { vendorId } = match.params;

  const [tabIndexValue, setTabIndexValue] = React.useState(0);
  const [vendorChanged, setVendorChanged] = React.useState(false);

  const isInitialMount = useRef(true);
  const isUser = role === "User";

  useEffect(() => {
    if (location.pathname.includes("description")) {
      setTabIndexValue(0);
    }
    if (location.pathname.includes("gallery")) {
      setTabIndexValue(1);
    }
    if (location.pathname.includes("review")) {
      setTabIndexValue(2);
    }
    if (location.pathname.includes("map")) {
      setTabIndexValue(3);
    }
    if (location.pathname.includes("booking")) {
      setTabIndexValue(4);
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
        return "/site/description";

      case 1:
        return "/site/gallery";

      case 2:
        return "/site/review";

      case 3:
        return "/site/map";

      case 4:
        return "/site/booking";

      default:
    }
  };

  const scheduleTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => {
      if (tabIndexValue !== newValue) {
        let pathname = getPushPathname(newValue);
        if (role !== "Vendor" && vendorId) {
          pathname = `/vendor/${vendorId}${pathname}`;
        }
        history.push(pathname);
      }
    },
    items: [
      {
        labelText: "Description",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <Description />
      },
      {
        labelText: "Gallery",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <Gallery />
      },
      {
        labelText: "Review",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <ReviewPage />
      },
      {
        labelText: "Map",
        labelIcon: <ArrowRightRoundedIcon />,
        content: <MapPage />
      },
      ...(isUser
        ? [
            {
              labelText: "Booking",
              labelIcon: <ArrowRightRoundedIcon />,
              content: <BookingPage />
            }
          ]
        : [])
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
          Site Page
        </Typography>
        {getTabContent()}
      </div>
    </Wrapper>
  );
};

SitePage.propTypes = {
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

export default compose(withConnect, withRouter)(SitePage);
