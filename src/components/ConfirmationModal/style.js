import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  confirmationAction: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  confirmationButtonRoot: {
    maxWidth: "8rem",
    padding: "8px 16px",
    marginTop: "3rem"
  },
  confirmationModalContent: {
    "& p": {
      lineHeight: 2
    }
  }
}));

export default useStyles;
