import React, { useEffect, useContext, useRef, useState } from "react";
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

import {
  getVendorInfo,
  getVendorDistance,
  setVendorInfo,
  clearVendorDistance,
  getVendorAdditionalInfo
} from "./actions";
import useStyles from "./style";

const SitePage = ({
  location,
  history,
  globalData,
  match,
  fetchVendorInfo,
  sitePageData,
  fetchVendorDistance,
  onSetVendorInfo,
  onClearVendorDistance,
  fetchVendorAdditionalInfo
}) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const { profile } = globalData;
  const {
    vendorProfile,
    getVendorDistanceLoading,
    vendorDistance
  } = sitePageData;
  const { role } = profile;

  const vendorId = match.params.vendorId || profile._id;

  const [tabIndexValue, setTabIndexValue] = useState(0);
  const [vendorChanged, setVendorChanged] = useState(false);

  const isInitialMount = useRef(true);
  const isUser = role === "User";
  const isAdmin = role === "Admin";

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
    if (vendorId) {
      if (location.state) {
        onSetVendorInfo(location.state.vendorDetail);
      } else {
        fetchVendorInfo(vendorId);
      }
      if (isUser) {
        getUserDistance();
      }
      fetchVendorAdditionalInfo({ vendorId });
    }
  }, [vendorId]);

  const getUserDistance = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchVendorDistance({
          vendorId: match.params.vendorId,
          query: getLocationParams(latitude, longitude)
        });
      },
      () => {
        onClearVendorDistance();
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  useEffect(() => {
    return () => {
      onClearVendorDistance();
    };
  }, []);

  const getLocationParams = (lat, lng) => {
    const latitude = `lat=${lat}`;
    const longitude = `&lng=${lng}`;
    return latitude + longitude;
  };

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
        <Typography variant="h6" className={classes.pageTitle}>
          {!isUser && "Site"}
          {!isUser && " - "}
          {vendorProfile &&
            `${vendorProfile.fullName} (${vendorProfile.phone})`}
          {getVendorDistanceLoading && " - ... away"}
          {vendorDistance && vendorDistance.distance && ` - ${vendorDistance.distance.text} away`}
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
  match: PropTypes.object,
  sitePageData: PropTypes.object,
  fetchVendorInfo: PropTypes.func,
  fetchVendorDistance: PropTypes.func,
  onSetVendorInfo: PropTypes.func,
  onClearVendorDistance: PropTypes.func,
  fetchVendorAdditionalInfo: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  sitePageData: state.SitePageReducer
});

const mapDispatchToProps = dispatch => ({
  fetchVendorInfo: data => dispatch(getVendorInfo(data)),
  fetchVendorAdditionalInfo: data => dispatch(getVendorAdditionalInfo(data)),
  fetchVendorDistance: data => dispatch(getVendorDistance(data)),
  onSetVendorInfo: data => dispatch(setVendorInfo(data)),
  onClearVendorDistance: () => dispatch(clearVendorDistance())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(SitePage);
