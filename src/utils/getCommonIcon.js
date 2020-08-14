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
        style={{ width: "24px" }}
      >
        <path
          fill={theme.palette.text.secondary}
          d="M45 187c-27 18-61-20-36-45L142 8c12-11 30-11 41 0l134 134c25 25-10 63-36 45v121h-83V198h-71v110H45V187z"
        />
      </svg>
    );
  }

  if (type === "filledProfile") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 81.244 111.25"
        style={{ width: "21px" }}
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
