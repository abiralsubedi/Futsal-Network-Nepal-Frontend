import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageContainer: {
    marginBottom: "1.5rem",
    "& img": {
      borderRadius: "5px",
      cursor: "pointer",
      width: "12rem"
    }
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
    height: "3rem",
    width: "3rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
  }
}));

export default useStyles;
