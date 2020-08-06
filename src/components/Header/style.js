import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  logoutButton: {
    cursor: "pointer"
  },
  appBarRoot: {
    background: theme.palette.common.headerColor
  },
  toolBarRoot: {
    minHeight: "64px"
  },
  toolBarGutters: {
    [theme.breakpoints.up("lg")]: {
      padding: "0 10rem"
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
    alignItems: "center"
  },
  navLinkList: {
    display: "-webkit-box,",
    listStyle: "none",
    paddingLeft: "0.8rem",
    color: "#ffffffe6",
    [theme.breakpoints.down("xs")]: {
      borderTop: `1.5px solid ${theme.palette.common.blackWhiteShadow}`
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
          background: theme.palette.common.blackWhiteShadow
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
    top: "58px !important",
    width: "18rem",
    borderRadius: "6px"
  },
  iconButtonRoot: {
    "&.active": {
      background: theme.palette.common.blackWhiteShadow,
      transition: "0.5s ease"
    }
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  menuItemRoot: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "3rem",
    "&:first-child": {
      minHeight: "5rem",
      height: "100%",
      justifyContent: "flex-start",
      whiteSpace: "pre-wrap"
    }
  },
  menuDetailItem: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "1rem",
    fontWeight: 600,
    "& div:nth-child(2)": {
      fontWeight: "normal",
      color: theme.palette.text.secondary
    }
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
