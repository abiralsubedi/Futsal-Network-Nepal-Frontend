import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import { ThemeContext } from "context/themeContext";

// import { getMapPage } from "./actions";
import useStyles from "./style";

const MapPage = ({ mapPageData, history, google }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

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

  return (
    <div className={classes.mapWrapper}>
      <Map
        google={google}
        zoom={14}
        containerStyle={containerStyle}
        initialCenter={{
          lat: 27.7172,
          lng: 85.324
        }}
      >
        <Marker onClick={onMarkerClick} name={"KaloLeni"} />
        <Marker
          title={"SOMA"}
          name={"SOMA"}
          position={{ lat: 27.7272, lng: 85.324 }}
          onClick={onMarkerClick}
        />
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapPage.propTypes = {
  // fetchMapPage: PropTypes.func,
  mapPageData: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  mapPageData: state.MapPageReducer
});

const mapDispatchToProps = dispatch => ({
  // fetchMapPage: data => dispatch(getMapPage(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
  GoogleApiWrapper({
    apiKey: "AIzaSyA_wvPi9ZsxJc-kA20-Um7EcMe1luts7zo"
  })
)(MapPage);
