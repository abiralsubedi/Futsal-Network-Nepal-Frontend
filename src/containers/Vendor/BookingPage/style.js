import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    height: "10rem"
  },
  bookingButtonRoot: {
    marginTop: "2rem",
    maxWidth: "8rem"
  },
  warningText: {
    color: theme.palette.warning.main,
    fontWeight: 600,
    marginTop: "0.25rem"
  }
}));

export default useStyles;
