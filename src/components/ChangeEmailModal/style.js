import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
