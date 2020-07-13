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
  }
}));

export default useStyles;