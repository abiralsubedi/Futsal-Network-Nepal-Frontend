import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    maxHeight: "52rem"
  },
  table: {
    minWidth: "17rem",
    border: `1px solid ${theme.palette.divider}`
  },
  tableHead: {
    fontSize: "1.125rem"
  },

  tableToolbar: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1.5rem",
    "&.highlight": {
      backgroundColor: `${theme.palette.primary.main}20 !important`,
      justifyContent: "start",
      borderTopRightRadius: "5px",
      borderTopLeftRadius: "5px"
    }
  },
  tableTitle: {
    marginRight: "1rem"
  },
  selectedRow: {
    backgroundColor: `${theme.palette.primary.main}20 !important`
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "center"
  },

  loadingWrapper: {
    height: "12rem"
  },
  peopleAddButton: {
    maxWidth: "8rem",
    padding: "0.5rem"
  },
  chipOutline: {
    "&.disabled": {
      color: theme.palette.grey[500],
      borderColor: theme.palette.grey[500]
    },
    fontWeight: 600,
    minWidth: "90px",
    borderWidth: "2px",
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  tableIcon: {
    "& svg": {
      color: theme.palette.text.secondary
    }
  }
}));

export default useStyles;
