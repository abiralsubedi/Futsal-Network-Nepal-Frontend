import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  ratingColor: {
    color: theme.palette.primary.main
  },
  addReviewContent: {
    margin: "1rem 0"
  },
  ratingWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: "1.5rem"
  },
  addReviewButtonRoot: {
    maxWidth: "8rem",
    padding: "8px 16px",
    marginTop: "2rem"
  },
  textAreaWrapper: {
    "& textarea": {
      lineHeight: 1.5
    }
  },
  ratingText: {
    color: theme.palette.primary.main,
    fontWeight: 600
  }
}));

export default useStyles;
