import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  vendorCardRoot: {
    marginRight: "1rem",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  imageContainer: {
    height: "10rem",
    marginBottom: "0.5rem"
  },
  roundedImage: {
    width: "100%",
    height: "100%"
  },
  cardContent: {
    padding: "0 0.5rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  loadingCardContent: {
    padding: "0 0.5rem",
    margin: "0.5rem 0"
  },
  vendorInfoText: {
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    margin: "0.5rem"
  },
  ratingColor: {
    color: theme.palette.primary.main
  },
  ratingCount: {
    marginLeft: "1rem"
  }
}));

export default useStyles;
