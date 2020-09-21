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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        style={{ width: "24px" }}
      >
        <path
          fill={theme.palette.text.secondary}
          d="M50 5C26.155 5 6.756 25.187 6.756 50S26.155 95 50 95s43.244-20.187 43.244-45S73.845 5 50 5zm0 83.854c-20.456 0-37.098-17.43-37.098-38.854S29.544 11.146 50 11.146 87.098 28.576 87.098 50 70.456 88.854 50 88.854z"
        />
        <path
          fill={theme.palette.text.secondary}
          d="M72.391 46.927H53.073V21.024a3.073 3.073 0 00-6.146 0V50A3.073 3.073 0 0050 53.073h22.391a3.073 3.073 0 000-6.146z"
        />
      </svg>
    );
  }

  if (type === "filledFootball") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 847 1058.75"
        style={{ width: "22px" }}
        fill={theme.palette.text.secondary}
      >
        <path
          fillRule="nonzero"
          d="M423 1c117 0 222 48 299 124 76 76 123 182 123 298 0 117-47 222-123 299-77 76-182 123-299 123-116 0-222-47-298-123C49 645 1 540 1 423c0-63 14-122 39-176v-1l1-2c21-44 50-85 84-119C201 49 307 1 423 1zm220 760l-4 12c28-16 53-36 75-59 35-34 63-75 84-120l-43 39-112 128zm16-646l15 105 1 2 88 132 67 10c-13-90-55-170-116-231-5-5-10-10-15-14l-40-4zM491 37c1 1 1 1 2 1 2 1 4 2 6 2l155 63 31 3c-70-58-150-86-238-95 7 2 42 24 44 26zM189 313L77 369 67 528l118 103 101-45 8-160-105-113zM67 366L44 264c-21 49-32 103-32 159 0 46 8 91 22 132l22-27 11-162zm1-150l96-101 18-25c-17 13-34 27-49 43-25 24-47 52-65 83zm139 553l-5 1c59 37 127 61 201 64l-16-10-180-55zm84-174l-101 46 22 118 176 54 91-52-28-106-160-60zm171 57l28 106 145-5 110-125-44-110-135 9-104 125zm12-275l92 139 135-9 50-151-83-126-145 8-49 139zM209 72l-33 45 73 36 161-39 70-70-49-33c-69 2-140 12-222 61zm43 91l-56 142 105 113 163-45 49-139-102-109-159 38z"
        />
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
