import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bookingDetailButton: {
    maxWidth: "8rem",
    padding: "8px 16px",
    marginTop: "2rem"
  },
  bookingDetailContent: {
    "& p": {
      lineHeight: 2
    }
  }
}));

export default useStyles;
