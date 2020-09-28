import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    height: "18rem"
  },
  galleryContent: {
    "& ul": {
      listStyle: "none",
      paddingLeft: 0
    }
  },
  toggleButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem"
  },
  toggleViewButton: {
    maxWidth: "8rem",
    padding: "0.5rem"
  },
  galleryImageContainer: {
    marginBottom: "2rem"
  },
  postGalleryButton: {
    maxWidth: "12rem"
  },
  dragHandler: {
    cursor: "pointer",
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
