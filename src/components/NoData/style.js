import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  noDataWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  noDataText: {
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
