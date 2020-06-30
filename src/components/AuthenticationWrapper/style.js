import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  authenticationWrapper: {
    display: "flex",
    minHeight: "100vh"
  },
  appScreen: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0",
    padding: "20px 24px",
    background: theme.palette.common.headerColor,
    [theme.breakpoints.up("lg")]: {
      padding: "20px 7rem"
    }
  },
  appContent: {
    color: theme.palette.common.white,
    height: "100%",
    "& p": {
      fontSize: "1.125rem"
    }
  },
  loginScreen: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 0",
    padding: "0 24px",
    [theme.breakpoints.up("lg")]: {
      padding: "0 7rem"
    }
  }
}));

export default useStyles;
