import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
  circularRoot: {
    marginRight: "0.8rem"
  }
}));

export default useStyles;
