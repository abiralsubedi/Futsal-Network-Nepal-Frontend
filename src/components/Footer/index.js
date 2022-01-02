import React from "react";
// import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import useStyles from "./style";

const Footer = ({ ...rest }) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="caption">
        &#169;
        {new Date().getFullYear()} Abiral Subedi
      </Typography>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
