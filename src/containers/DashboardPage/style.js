import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dashboardContainer: {
    "& p": {
      fontSize: "1.125rem"
    },
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main
    },
    "& strong": {
      fontWeight: "600"
    }
  }
}));

export default useStyles;
