import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  snackBarRoot: {
    maxWidth: "28rem",
    "& .MuiSnackbarContent-root": {
      padding: "0.8rem",
      fontSize: "0.935rem"
    }
  },
  snackBarButton: {
    color: theme.palette.common.white,
    fontWeight: 600
  }
}));

export default useStyles;
