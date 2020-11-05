import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  vendorCardRoot: {
    maxWidth: "250px"
  },
  roundedImage: {
    width: "100%"
  },
  cardContent: {
    padding: "0 0.5rem"
  },
  vendorInfoText: {
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "6px"
  },
  vendorAddress: {
    display: "flex",
    alignItems: "center",
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
