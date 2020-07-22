import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  informationButtonRoot: {
    marginTop: "2.5rem",
    maxWidth: "12rem"
  },
  actionText: {
    marginTop: "1rem",
    fontWeight: 600,
    display: "inline-block",
    cursor: "pointer"
  },
  changeEmailField: {
    margin: "2rem 0 1rem 0"
  }
}));

export default useStyles;
