import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import { Wrapper } from "components/Common";
import useStyles from "./style";

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Wrapper className={classes.notFoundWrapper}>
      <div className={classes.notFoundContainer}>
        <div className={classes.errorText}>
          <Typography>We could not find your page!</Typography>
          <Link to="/">Return to safe place</Link>
        </div>
        <img
          src="https://image.flaticon.com/icons/svg/2292/2292952.svg"
          alt="not-found"
        />
      </div>
    </Wrapper>
  );
};

NotFoundPage.propTypes = { component: PropTypes.object };

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(NotFoundPage);
