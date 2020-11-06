import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backTextWrapper: {
    display: "flex",
    marginBottom: "2rem"
  },
  backText: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.125rem",
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main
    },
    "& svg": {
      marginRight: "0.5rem"
    }
  }
}));

export default useStyles;
