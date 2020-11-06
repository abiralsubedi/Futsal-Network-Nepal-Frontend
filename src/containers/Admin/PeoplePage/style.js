import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  pageTitle: {
    marginBottom: "0.8rem",
    color: theme.palette.text.secondary
  },
  customVerticalTabHeight: {
    minHeight: "32rem"
  },
  customHorizontalTabHeight: {}
}));

export default useStyles;
