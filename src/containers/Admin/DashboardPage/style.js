import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  welcomeText: {
    fontSize: "1.125rem",
    marginBottom: '1rem',
    "& strong": {
      fontWeight: "600"
    }
  },
  sectionTitle: {
    margin: "1rem 0 0.5rem",
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
