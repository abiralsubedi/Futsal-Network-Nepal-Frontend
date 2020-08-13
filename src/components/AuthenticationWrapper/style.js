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
    background: theme.palette.common.primaryDarkColor,
    [theme.breakpoints.up("lg")]: {
      padding: "20px 7rem"
    }
  },
  appContent: {
    color: theme.palette.common.white,
    height: "100%",
    "& p": {
      fontSize: "1.125rem"
    },
    "& h5": {
      margin: "1.125rem 0"
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
  },
  authenticationSetting: {
    padding: "0.5rem 0",
    position: "fixed",
    top: "10%",
    right: "0",
    transform: "translate(calc(100% - 3rem), -50%)",
    transition: "all .3s ease-in",

    "&:hover": {
      transform: "translate(3rem, -50%)"
    }
  },
  settingButtonLabel: {
    padding: "0 0.25rem",
    width: "10rem",
    display: "flex",
    justifyContent: "space-between",
    "& svg": {
      color: theme.palette.text.secondary
    }
  },
  formControlRoot: {
    paddingRight: "1rem"
  }
}));

export default useStyles;
