import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    height: "18rem"
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
  }
}));

export default useStyles;
