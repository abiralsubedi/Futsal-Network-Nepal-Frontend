import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  circularWrapper: {
    minHeight: "5rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default useStyles;
