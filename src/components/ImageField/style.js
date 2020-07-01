import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageContainer: {
    marginBottom: "1.5rem",
    "& img": {
      borderRadius: "5px",
      cursor: "pointer",
      width: "12rem"
    }
  }
}));

export default useStyles;
