import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    "& form": {
      width: "100%"
    }
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
  textLink: {
    textDecoration: "none",
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  circularRoot: {
    marginRight: "0.8rem"
  }
}));

export default useStyles;
