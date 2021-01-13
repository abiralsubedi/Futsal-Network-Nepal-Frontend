import React from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

import useStyles from "./style";

const { REACT_APP_CAPTCHA_SITE_KEY } = process.env;

const ReCaptcha = ({ onCaptchaChange, captchaRef }) => {
  const classes = useStyles();

  return (
    <ReCAPTCHA
      ref={captchaRef}
      sitekey={REACT_APP_CAPTCHA_SITE_KEY || ""}
      onChange={onCaptchaChange}
    />
  );
};

ReCaptcha.propTypes = {
  onCaptchaChange: PropTypes.func,
  captchaRef: PropTypes.object
};

export default ReCaptcha;
