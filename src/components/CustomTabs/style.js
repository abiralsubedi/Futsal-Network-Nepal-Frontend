import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  verticalRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "15rem",
    borderRadius: "6px",
    "& .Mui-selected": {
      color: theme.palette.common.primaryWhiteColor,
      "& svg": {
        color: theme.palette.common.primaryWhiteColor
      }
    }
  },
  verticalScroller: {
    width: "16rem"
  },
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  horizontalRoot: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "6px",
    "& .Mui-selected": {
      color: theme.palette.common.primaryWhiteColor,
      "& svg": {
        color: theme.palette.common.primaryWhiteColor
      }
    }
  },
  tabLabel: {
    textTransform: "none",
    fontSize: "1.125rem",
    display: "flex",
    textAlign: "left",
    width: "100%",
    width: "12rem",
    "&.vertical": {
      width: "15rem"
    },
    "& svg": {
      marginRight: "0.5rem",
      fontSize: "1.75rem",
      color: theme.palette.text.secondary
    }
  },
  indicator: {
    background: theme.palette.common.primaryWhiteColor
  }
}));

export default useStyles;
