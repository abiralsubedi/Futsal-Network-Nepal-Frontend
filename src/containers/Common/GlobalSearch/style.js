import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    padding: "0.8rem",
    paddingBottom: 0,
    width: "30rem",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 2rem)"
    }
  },
  searchHeader: {
    display: "flex",
    paddingBottom: "1rem"
  },
  searchBaseRoot: {
    background: theme.palette.common.darkLightShadow,
    borderRadius: "2rem",
    padding: "0 1rem",
    width: "100%",
    marginLeft: "0.5rem"
  },
  searchInputRoot: {},
  searchIcon: {
    color: theme.palette.text.secondary
  },
  searchBody: {
    maxHeight: "27rem",
    overflowY: "auto"
  },
  listItemText: {
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  skeletonWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem"
  },
  skeletonAvatar: {
    marginRight: "1rem"
  },
  skeletonDescription: {
    width: "100%"
  },
  globalSearchNoData: {
    padding: "2rem 0"
  },
  searchItemSecondary: {
    display: "flex",
    color: theme.palette.text.secondary,
    alignItems: "center",
    "& svg": {
      marginRight: "5px"
    }
  },
  searchIconButtonRoot: {
    "&:hover": {
      background: "inherit"
    }
  }
}));

export default useStyles;
