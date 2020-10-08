import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    height: "10rem"
  },
  writeReviewButtonRoot: {
    padding: "6px 16px",
    marginBottom: "1.5rem",
    borderRadius: "5px",
    color: theme.palette.text.secondary
  },
  selfReviewWrapper: {
    marginTop: "2rem"
  },
  reviewTitle: {
    letterSpacing: "0.25px",
    marginBottom: "0.5rem"
  }
}));

export default useStyles;
