import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dialogPaperRoot: {
    borderRadius: "8px"
  },
  dialogContent: {
    "& hr": {
      border: "none",
      borderTop: `1.5px solid ${theme.palette.divider}`
    }
  },
  dialogTitle: {
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
  dialogBody: {
    padding: theme.spacing(0, 4, 1),
    maxHeight: "34rem",
    overflowY: "auto"
  }
}));

export default useStyles;
