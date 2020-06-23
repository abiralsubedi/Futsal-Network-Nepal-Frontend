import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  logoutButton: {
    cursor: "pointer"
  },
  appBarRoot: {
    background: theme.palette.common.headerColor
  },
  primaryHeaderBar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  primaryNavBar: {
    display: "flex",
    alignItems: "center"
  },
  navLinkList: {
    display: "-webkit-box,",
    display: "-ms-flexbox",
    listStyle: "none",
    paddingLeft: "0.8rem",
    color: "#ffffffe6",
    [theme.breakpoints.down("xs")]: {
      borderTop: `1.5px solid ${theme.palette.common.headerNavLinkShadow}`
    },
    "& li": {
      display: "inline",
      margin: "0 0.5rem",
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        display: "block",
        marginTop: "0.8rem"
      },
      "& a": {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: "1.6",
        textDecoration: "none",
        color: "inherit",
        padding: "0.35rem 0.5rem",
        borderRadius: "5px",
        "&:hover, &.active": {
          background: theme.palette.common.headerNavLinkShadow
        },
        [theme.breakpoints.down("xs")]: {
          width: "12rem !important",
          display: "inline-block"
        },
        "& svg": {
          position: "absolute",
          top: "-0.3rem",
          [theme.breakpoints.down("xs")]: {
            top: "0.5rem"
          }
        },
        "& span": {
          paddingLeft: "2rem"
        }
      }
    }
  },
  drawerPaper: {
    background: theme.palette.common.headerColor,
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
  },
  profileMenuPaper: {
    top: "64px !important",
    minWidth: "18rem"
  },
  iconButtonRoot: {
    "&.active": {
      background: theme.palette.common.headerNavLinkShadow,
      transition: "0.5s ease"
    }
  },
  menuItemRoot: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "3rem"
  },
  menuItemLeft: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: theme.palette.text.secondary,
      fontSize: "1.8rem",
      marginRight: "0.5rem"
    },
    "& p": {
      fontSize: "1rem"
    }
  }
}));

export default useStyles;
