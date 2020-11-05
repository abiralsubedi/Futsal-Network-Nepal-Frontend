import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  arrowButton: {
    background: `${theme.palette.grey[500]}99 !important`,
    transition: "0.5s ease-in-out",
    borderRadius: "35px",
    "&:hover": {
      background: `${theme.palette.grey[500]} !important`
    },
    "& svg": {
      color: theme.palette.common.darkLightColor
    }
  }
}));

export default useStyles;
