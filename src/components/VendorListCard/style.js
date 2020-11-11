import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  vendorCardRoot: {
    marginBottom: "1.5rem",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  imageContainer: {
    height: "10rem",
    [theme.breakpoints.up("sm")]: {
      height: "11rem"
    }
  },
  roundedImage: {
    width: "100%",
    height: "100%"
  },
  cardContent: {
    padding: "0.5rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  loadingCardContent: {
    padding: "0.5rem",
    margin: "0.5rem 0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  loadingButtonGroup: {
    display: "flex"
  },
  vendorInfoText: {
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.up("sm")]: {
      WebkitLineClamp: "1"
    }
  },
  vendorAddress: {
    display: "flex",
    alignItems: "center",
    margin: "6px 0",
    "& svg": {
      marginRight: "5px"
    }
  },
  vendorCardRating: {
    display: "inline-flex",
    margin: "0.5rem 0"
  },
  ratingColor: {
    color: theme.palette.primary.main
  },
  secondaryText: {
    color: theme.palette.text.secondary
  },
  ratingCount: {
    marginLeft: "1rem",
    color: theme.palette.text.secondary
  },
  vendorListCardButton: {
    padding: "8px 16px",
    margin: "0 0 4px 0"
  }
}));

export default useStyles;
