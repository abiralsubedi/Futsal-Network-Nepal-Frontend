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
  secondaryText: {
    color: theme.palette.text.secondary
  },
  cursorPointer: {
    cursor: "pointer"
  },
  actionText: {
    margin: "1rem 0 0.6rem 0",
    fontWeight: 600,
    display: "inline-block",
    cursor: "pointer"
  },
  textLink: {
    textDecoration: "none",
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  circularRoot: {
    marginRight: "0.8rem"
  },
  forgotPasswordField: {
    margin: "2rem 0 1rem 0"
  }
}));

export default useStyles;
