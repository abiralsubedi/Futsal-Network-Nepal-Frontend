import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    marginTop: "3rem"
  },
  informationButtonRoot: {
    marginRight: "2rem",
    maxWidth: "12rem"
  },
  actionText: {
    marginTop: "0.5rem",
    fontWeight: 600,
    display: "inline-block",
    cursor: "pointer"
  }
}));

export default useStyles;
