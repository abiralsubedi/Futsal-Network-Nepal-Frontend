import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  confirmationAction: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  confirmationButtonRoot: {
    maxWidth: "8rem",
    padding: "8px 16px"
  },
  circularConfirmationRoot: {
    marginRight: "0.8rem"
  }
}));

export default useStyles;
