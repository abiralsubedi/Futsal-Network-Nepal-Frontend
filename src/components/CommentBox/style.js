import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  largeAvatar: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6),
      height: theme.spacing(6)
    }
  },
  commentWrapper: {
    margin: "2rem 0"
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  commentProfileWrapper: {
    display: "flex",
    alignItems: "center"
  },
  commentAvatar: {
    marginRight: "0.6rem"
  },
  commentName: {
    fontWeight: 600,
    paddingLeft: "1px",
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  commentRate: {
    display: "flex"
  },
  ratingColor: {
    color: theme.palette.primary.main
  },
  commentActionButton: {
    "&:hover": {
      background: "inherit"
    }
  },
  commentActionIcon: {
    color: theme.palette.text.secondary
  },
  commentBody: {
    marginTop: "1rem",
    cursor: "pointer",
    "& p": {
      fontSize: "0.95rem",
      lineHeight: 1.7
    }
  },
  commentContent: {
    display: "-webkit-box",
    maxWidth: "100%",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: "3",
    "&.fullReview": {
      WebkitLineClamp: "unset"
    }
  }
}));

export default useStyles;
