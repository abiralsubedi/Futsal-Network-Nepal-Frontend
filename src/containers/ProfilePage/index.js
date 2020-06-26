import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

import { Wrapper } from "components/Common";
import TextField from "components/TextField";
import { VerticalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import { getTestData } from "./actions";
import useStyles from "./style";
import { HorizontalTabs } from "../../components/CustomTabs";

const ProfilePage = ({ profileData, fetchTestData }) => {
  const { testData } = profileData;
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [tabIndexValue, setTabIndexValue] = React.useState(1);

  useEffect(() => {
    fetchTestData();
  }, []);

  const profileTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => setTabIndexValue(newValue),
    items: [
      {
        labelText: "Basic Information",
        labelIcon: <HomeIcon />,
        content: <div>Content of Item 1</div>
      },
      {
        labelText: "Change Password",
        labelIcon: <PersonIcon />,
        content: <div>Content of Item 2</div>
      }
    ]
  };

  return (
    <Wrapper>
      <div className={classes.profileContainer}>
        <Typography variant="h6" color="textSecondary">
          Profile Page
        </Typography>
        {isMobile ? (
          <HorizontalTabs {...profileTabContent} />
        ) : (
          <VerticalTabs {...profileTabContent} />
        )}

        <form
          onSubmit={e => {
            e.preventDefault();
            console.log("submitted");
          }}
          style={{ marginTop: "5rem" }}
        >
          <TextField
            id="username"
            label="Username"
            value={username}
            handleChange={val => setUsername(val)}
            autoFocus
            required
            fullWidth
            customClasses={classes.loginTextField}
          />
        </form>
      </div>
    </Wrapper>
  );
};

ProfilePage.propTypes = {
  profileData: PropTypes.object,
  fetchTestData: PropTypes.func
};

const mapStateToProps = state => ({ profileData: state.ProfileReducer });

const mapDispatchToProps = dispatch => ({
  fetchTestData: () => dispatch(getTestData())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
