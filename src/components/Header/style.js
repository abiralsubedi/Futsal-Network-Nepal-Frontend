import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  logoutButton: {
    cursor: "pointer"
  },
  appBarRoot: {
    background: theme.palette.common.lightDarkColor
  },
  toolBarRoot: {
    minHeight: "64px"
  },
  toolBarGutters: {
    [theme.breakpoints.up("lg")]: {
      padding: "0",
      width: "1200px",
      margin: "auto"
    }
  },
  primaryHeaderBar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  primaryNavBar: {
    display: "flex",
    alignItems: "center",

    margin: "auto"
  },
  navLinkList: {
    display: "-webkit-box,",
    listStyle: "none",
    paddingLeft: "0.8rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      borderTop: `1.5px solid ${theme.palette.divider}`
    },
    "& li": {
      display: "inline",
      margin: "0 0.5rem",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        display: "block",
        marginTop: "0.8rem"
      },
      "& a": {
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: "1.6",
        textDecoration: "none",
        color: "inherit",
        padding: "0.6rem",
        borderRadius: "5px",
        "&:hover, &.active": {
          color: theme.palette.primary.main,
          "& svg": {
            "& path": {
              fill: theme.palette.primary.main
            }
          }
        },
        "&:hover": {
          background: `${theme.palette.primary.main}15`,
          borderRadius: "2rem"
        },
        "&.active": {
          fontWeight: 600
        },
        [theme.breakpoints.down("sm")]: {
          width: "12rem !important",
          display: "inline-block"
        },
        "& svg": {
          position: "absolute",
          top: "-0.35rem",
          [theme.breakpoints.down("sm")]: {
            top: "0.8rem"
          }
        },
        "& span": {
          paddingLeft: "1.75rem"
        }
      }
    }
  },
  drawerPaper: {
    background: theme.palette.common.lightDarkColor,
    width: "16rem"
  },
  drawerLogo: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 0 0 1.5rem"
  },
  logoBar: {
    "& svg": {
      fontSize: "1.9rem"
    }
  }
}));

export default useStyles;
