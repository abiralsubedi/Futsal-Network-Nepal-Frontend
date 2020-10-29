import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import { ThemeContext } from "context/themeContext";
import Loader from "components/Loader";

import useStyles from "./style";
import { Typography } from "@material-ui/core";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const MapPage = ({ sitePageData, google, globalData }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);
  const { vendorProfile, getVendorProfileLoading } = sitePageData;
  const { profile } = globalData;

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  useEffect(() => {
    // getDirection();
  }, []);

  const getDirection = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position, "pos");
      },
      () => {
        console.log("error");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const containerStyle = {
    width: isMobile ? "80%" : "100%",
    maxHeight: "28rem",
    maxWidth: "50rem"
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = props => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker({});
    }
  };

  let updatedVendorProfile = vendorProfile;
  if (profile.role === "Vendor") {
    updatedVendorProfile = profile;
  }

  if (getVendorProfileLoading) {
    return <Loader wrapperClass={classes.loadingWrapper} />;
  }

  return (
    <div className={classes.mapWrapper}>
      <Map
        google={google}
        zoom={14}
        containerStyle={containerStyle}
        initialCenter={{
          ...updatedVendorProfile.location.coordinates
        }}
      >
        <Marker
          onClick={onMarkerClick}
          name={updatedVendorProfile.fullName}
          title={updatedVendorProfile.fullName}
          position={{ ...updatedVendorProfile.location.coordinates }}
        />
        <Marker
          name="Test"
          title="Test"
          position={{ lat: 27.403449, lng: 85.0545096 }}
        />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <Typography variant="body1" className={classes.markerDescription}>
              {selectedPlace.name}
            </Typography>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapPage.propTypes = {
  sitePageData: PropTypes.object
};

const mapStateToProps = state => ({
  sitePageData: state.SitePageReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
  GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
  })
)(MapPage);
