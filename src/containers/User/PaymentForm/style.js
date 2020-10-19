import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formContent: {
    "& label": {
      cursor: "pointer"
    },
    "& p": {
      fontWeight: 600,
      fontSize: "1.125rem"
    }
  },
  paymentButtonWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  paymentButtonRoot: {
    maxWidth: "12rem",
    marginTop: "1.5rem"
  }
}));

export default useStyles;
