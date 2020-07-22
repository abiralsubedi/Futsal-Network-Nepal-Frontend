import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  notFoundWrapper: {
    height: "100vh"
  },
  notFoundContainer: {
    textAlign: "center",
    paddingTop: "64px",
    "& img": {
      maxWidth: "24rem",
      [theme.breakpoints.down("xs")]: {
        width: "16rem"
      }
    }
  },
  errorText: {
    marginBottom: "2rem",
    "& p": {
      fontSize: "2rem"
    },
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontSize: "1.25rem",
      fontWeight: 600
    }
  }
}));

export default useStyles;
