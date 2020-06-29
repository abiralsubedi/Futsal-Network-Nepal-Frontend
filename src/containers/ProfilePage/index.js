import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

import BasicInformation from "containers/BasicInformation";

import { Wrapper } from "components/Common";
import { VerticalTabs, HorizontalTabs } from "components/CustomTabs";

import { ThemeContext } from "context/themeContext";

import { getProfileInfo } from "containers/LoginPage/actions";
import useStyles from "./style";

const ProfilePage = ({ fetchProfileInfo }) => {
  const classes = useStyles();
  const { isMobile } = useContext(ThemeContext);

  const [tabIndexValue, setTabIndexValue] = React.useState(0);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const profileTabContent = {
    value: tabIndexValue,
    handleChange: (event, newValue) => setTabIndexValue(newValue),
    items: [
      {
        labelText: "Basic Information",
        labelIcon: <HomeIcon />,
        content: <BasicInformation />
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
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.pageTitle}
        >
          Profile Page
        </Typography>
        {isMobile ? (
          <HorizontalTabs {...profileTabContent} height="30rem" />
        ) : (
          <VerticalTabs {...profileTabContent} height="30rem" />
        )}
      </div>
    </Wrapper>
  );
};

ProfilePage.propTypes = {
  fetchProfileInfo: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchProfileInfo: () => dispatch(getProfileInfo())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
