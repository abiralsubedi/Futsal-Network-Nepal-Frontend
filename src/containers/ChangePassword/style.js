import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  changePasswordContent: {
    "& p": {
      fontSize: "1.125rem"
    }
  },
  passwordButtonRoot: {
    marginTop: "3rem",
    maxWidth: "12rem"
  },
  circularRoot: {
    marginRight: "0.8rem"
  }
}));

export default useStyles;
