import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    background: theme.palette.common.paperBackgroundColor,
    padding: "20px 24px"
  },
  paperRootContainer: {
    [theme.breakpoints.up("lg")]: {
      width: "1200px",
      margin: "auto"
    }
  }
}));

export default useStyles;
