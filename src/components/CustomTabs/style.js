import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  verticalRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "15rem",
    borderRadius: "6px",
    "& .Mui-selected": {
      "& svg": {
        color: theme.palette.primary.main
      }
    }
  },
  verticalScroller: {
    width: "13rem"
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
      "& svg": {
        color: theme.palette.primary.main
      }
    }
  },
  tabLabel: {
    textTransform: "none",
    fontSize: "1.25rem",
    display: "flex",
    textAlign: "left",
    width: "100%",
    width: "10rem",
    "&.vertical": {
      width: "11rem"
    },
    "& svg": {
      marginRight: "0.5rem",
      fontSize: "1.8rem",
      color: theme.palette.text.secondary
    }
  }
}));

export default useStyles;
