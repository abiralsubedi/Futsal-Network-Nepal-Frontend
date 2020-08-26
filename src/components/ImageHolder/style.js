import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageHolderContainer: {
    display: "flex"
  },
  imageHolder: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px"
  },
  roundedImage: {
    position: "relative",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    maxHeight: "12rem",
    cursor: "pointer",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px"
  },
  imageActions: {
    paddingBottom: "0.5rem",
    display: "flex",
    justifyContent: "space-around"
  },
  imageCaption: {
    // marginLeft: "1rem"
  },
  captionTextArea: {
    width: "100%",
    padding: "0.6rem",
    resize: "none"
  }
}));

export default useStyles;
