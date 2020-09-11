import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

const GetCommonIcon = ({ type }) => {
  const theme = useTheme();
  if (type === "filledHome") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 326 385"
        style={{ width: "22px" }}
      >
        <path
          fill={theme.palette.text.secondary}
          d="M45 187c-27 18-61-20-36-45L142 8c12-11 30-11 41 0l134 134c25 25-10 63-36 45v121h-83V198h-71v110H45V187z"
        />
      </svg>
    );
  }

  if (type === "filledSchedule") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" style={{ width: "24px" }}>
        <path fill={theme.palette.text.secondary} d="M50 5C26.155 5 6.756 25.187 6.756 50S26.155 95 50 95s43.244-20.187 43.244-45S73.845 5 50 5zm0 83.854c-20.456 0-37.098-17.43-37.098-38.854S29.544 11.146 50 11.146 87.098 28.576 87.098 50 70.456 88.854 50 88.854z" />
        <path fill={theme.palette.text.secondary} d="M72.391 46.927H53.073V21.024a3.073 3.073 0 00-6.146 0V50A3.073 3.073 0 0050 53.073h22.391a3.073 3.073 0 000-6.146z" />
      </svg>
    );
  }

  if (type === "filledProfile") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 81.244 111.25"
        style={{ width: "19px" }}
      >
        <path
          fill={theme.palette.text.secondary}
          d="M48.234 49.116C58.4 45.889 65.771 36.382 65.771 25.147 65.771 11.259 54.513 0 40.624 0c-13.89 0-25.148 11.259-25.148 25.147 0 11.234 7.369 20.742 17.535 23.966C14.217 52.68 0 69.168 0 89h81.244c0-19.832-14.217-36.318-33.01-39.884z"
        />
      </svg>
    );
  }

  return "";
};

GetCommonIcon.propTypes = {
  type: PropTypes.string
};

export default GetCommonIcon;
