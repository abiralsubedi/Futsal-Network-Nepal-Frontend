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
    color: "#ffffffe6",
    "& li": {
      display: "inline",
      margin: "0 0.5rem",
      position: "relative",
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
        "& svg": {
          position: "absolute",
          top: "-0.3rem"
        },
        "& span": {
          paddingLeft: "2rem"
        }
      }
    }
  },
  profileMenuPaper: {
    top: "64px !important",
    minWidth: "18rem"
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
