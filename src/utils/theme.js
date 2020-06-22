import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, blue } from "@material-ui/core/colors";

const getTheme = darkMode => {
  return createMuiTheme({
    palette: {
      common: {
        headerColor: darkMode ? "#333333" : "#2196f3",
        headerNavLinkShadow: darkMode? '#272727': '#1580d6',
        textFieldShadow: darkMode ? "#424242" : "#ffffff"
      },
      primary: blue,
      secondary: deepPurple,
      type: darkMode ? "dark" : "light"
    },
    typography: {
      fontFamily: "'Proxima Nova', 'Roboto', 'Helvetica', 'Arial', sans-serif"
    }
  });
};

export default getTheme;
