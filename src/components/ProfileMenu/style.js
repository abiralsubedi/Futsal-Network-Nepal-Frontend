import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  profileMenuPaper: {
    top: "58px !important",
    width: "18rem",
    borderRadius: "6px"
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
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
  },
  iconButtonRoot: {
    color: theme.palette.text.secondary,
    "&.active": {
      background: `${theme.palette.common.darkLightShadow}`
    }
  }
}));

export default useStyles;
