import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    maxHeight: "40rem"
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
    "&.highlight": {
      backgroundColor: `${theme.palette.primary.main}20 !important`
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
  }
}));

export default useStyles;
