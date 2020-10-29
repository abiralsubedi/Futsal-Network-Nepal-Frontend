// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";

// Import React Scrit Libraray to load Google object
import Script from "react-load-script";

import TextField from "components/TextField";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
class GooglePlaceSearch extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: "",
      query: ""
    };
  }

  componentDidMount() {
    const { currentPlace } = this.props;
    this.setState({ query: currentPlace });
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: []
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(["geometry", "name", "formatted_address"]);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    const { handleChangePlace } = this.props;
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();

    // Check if address is valid
    if (addressObject) {
      // Set State
      this.setState({
        city: addressObject.formatted_address,
        query: addressObject.formatted_address
      });
      handleChangePlace(addressObject);
    }
  };

  render() {
    const { query } = this.state;

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <TextField
          id="autocomplete"
          label="Search Place"
          value={query}
          handleChange={val => this.setState({ query: val })}
          required
          fullWidth
          autoFocus
        />
      </div>
    );
  }
}

GooglePlaceSearch.propTypes = {
  currentPlace: PropTypes.string,
  handleChangePlace: PropTypes.func
};

export default GooglePlaceSearch;
