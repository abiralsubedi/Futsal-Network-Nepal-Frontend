import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  primaryField: {
    "& .MuiOutlinedInput-root:not(.Mui-error)": {
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main
      }
    }
  },
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.common.textFieldShadow} inset`,
      WebkitTextFillColor: theme.palette.text.primary,
      borderRadius: 0
    }
  }
}));

export default useStyles;
