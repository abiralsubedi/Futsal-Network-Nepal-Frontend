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
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.common.textFieldShadow} inset`,
      WebkitTextFillColor: theme.palette.text.primary
    }
  }
}));

export default useStyles;
