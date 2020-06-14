import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  loginTextField: {
    margin: "1rem 0"
  },
  title: {
    color: theme.palette.common.headerColor
  },
  cursorPointer: {
    cursor: "pointer"
  },
  buttonLabel: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: "22px",
    "& img": {
      marginRight: "0.5rem",
      width: "1.625rem"
    }
  },
  buttonRoot: {
    margin: "0.8rem 0",
    padding: "0.8125rem"
  },
  buttonIcon: {
    marginRight: "0.5rem"
  },
  textLink: {
    textDecoration: "none",
    fontWeight: 700,
    color: theme.palette.primary.main
  }
}));

export default useStyles;
