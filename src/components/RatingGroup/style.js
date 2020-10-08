import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  ratingColor: {
    color: theme.palette.primary.main
  },
  avgReviewWrapper: {
    textAlign: "center"
  },
  ratingBarWrapper: {
    display: "flex",
    alignItems: "center"
  },
  ratingBar: {
    width: "100%",
    marginLeft: "1rem"
  },
  skeletonRoot: {
    borderRadius: "5px",
    width: "100%",
    marginBottom: "5px !important"
  }
}));

export default useStyles;
