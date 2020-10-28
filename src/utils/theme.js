import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, blue } from "@material-ui/core/colors";

const getTheme = darkMode => {
  return createMuiTheme({
    palette: {
      common: {
        paperBackgroundColor: darkMode ? "#212121" : "#F5F7F9",
        textFieldShadow: darkMode ? "#424242" : "#ffffff",
        primaryDarkColor: darkMode ? "#333333" : "#2196f3",
        lightDarkColor: darkMode ? "#333333" : "#ffffff",
        darkLightColor: darkMode ? "#ffffff" : "#333333",
        cardLightDarkColor: darkMode ? "#424242" : "#ffffff",

        darkLightShadow: darkMode
          ? "rgba(255, 255, 255, 0.06)"
          : "rgba(0, 0, 0, 0.08)",
        lightDarkShadow: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
        primaryWhiteColor: darkMode ? "#ffffff" : "#2196f3"
      },
      primary: blue,
      secondary: deepPurple,
      type: darkMode ? "dark" : "light"
    },
    typography: {
      fontFamily: [
        "Proxima Nova",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif"
      ].join(",")
    }
  });
};

export default getTheme;
