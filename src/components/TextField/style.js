import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  primaryField: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main
      }
    }
  },
  input: {
    "&:-webkit-autofill": {
      transitionDelay: "999999s",
      transitionProperty: "background-color, color"
    }
  }
}));

export default useStyles;
