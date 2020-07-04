import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    outline: "none",
    boxShadow: theme.shadows[5],
    "& hr": {
      border: "none",
      borderTop: `1.5px solid ${theme.palette.divider}`
    },
    width: "45%",
    [theme.breakpoints.down("md")]: {
      width: "55%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%"
    }
  },
  modalTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.35rem",
    fontWeight: "600",
    padding: theme.spacing(2, 4, 0),
    "& svg": {
      color: theme.palette.text.secondary,
      fontSize: "1.8rem",
      cursor: "pointer"
    }
  },
  modalContent: {
    padding: theme.spacing(0, 4, 1),
    maxHeight: "34rem",
    overflowY: "auto"
  }
}));

export default useStyles;
