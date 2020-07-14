import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageContainer: {
    marginBottom: "1.5rem"
  },
  imageMenuPaper: {
    borderRadius: "6px"
  },
  imageField: {},
  roundedImage: {
    position: "relative",
    borderRadius: "6%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "12rem",
    height: "12rem",
    cursor: "pointer"
  },
  imageAction: {
    position: "absolute",
    right: "0.2rem",
    bottom: "0.2rem",
    background: theme.palette.common.whiteBlackShadow,
    boxSizing: "border-box",
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  menuItemLabel: {
    textTransform: "none",
    fontSize: "1rem",
    display: "flex",
    textAlign: "left",
    width: "12rem",
    "& svg": {
      marginRight: "0.5rem",
      fontSize: "1.5rem",
      color: theme.palette.text.secondary
    }
  },
  attachmentThumbnail: {
    padding: "10px",
    WebkitBoxAlign: "center",
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "center",
    borderRadius: "4px",
    background: theme.palette.grey[100],
    minHeight: "8rem",
    "& img": {
      maxWidth: "14rem",
      borderRadius: "5px"
    },
    color: theme.palette.common.black
  },
  imageButtonRoot: {
    maxWidth: "9rem",
    marginTop: "1.5rem"
  },
  circularImageRoot: {
    marginRight: "0.8rem"
  }
}));

export default useStyles;
