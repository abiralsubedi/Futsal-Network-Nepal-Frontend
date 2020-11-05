import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  welcomeText: {
    fontSize: "1.125rem",
    "& strong": {
      fontWeight: "600"
    }
  }
}));

export default useStyles;
