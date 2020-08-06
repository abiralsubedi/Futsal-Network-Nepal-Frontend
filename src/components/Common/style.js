import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up("md")]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up("lg")]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up("xl")]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  paperRoot: {
    background: theme.palette.common.paperBackgroundColor,
    padding: "20px 24px",
    [theme.breakpoints.up("lg")]: {
      padding: "20px 10rem"
    }
  },

  contentBlock: {
    padding: 20,
    "& h3": {
      fontSize: 18,
      margin: "0 0 20px 0",
      textTransform: "uppercase"
    },
    "& h4": {
      color: "#8d8d8d",
      fontSize: 14,
      fontWeight: 600,
      textTransform: "uppercase"
    }
  },
  downloadIconWrapper: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export default useStyles;
