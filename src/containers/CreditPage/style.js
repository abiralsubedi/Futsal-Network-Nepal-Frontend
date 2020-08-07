import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  creditBalanceContainer: {
    marginBottom: "2rem"
  },
  balance: {
    fontSize: "1.25rem",
    "& span": {
      fontSize: "2rem"
    }
  },
  creditButtonRoot: {
    maxWidth: "8rem"
  },
  tableContainer: {
    maxHeight: "25.125rem"
  },
  table: {
    minWidth: "17rem"
  },
  tableHead: {
    fontSize: "1.125rem"
  },
  tableTitle: {
    fontSize: "1.375rem",
    marginTop: "1.5rem"
  },
  dateRange: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.25rem"
  },
  dateDivider: {
    margin: "0 1rem",
    fontWeight: "600"
  },
  loadingWrapper: {
    height: "12rem"
  },
  creditCell: {
    fontWeight: 600,
    "&.creditAmount": {
      color: theme.palette.success.main
    },
    "&.debitAmount": {
      color: theme.palette.error.main
    }
  }
}));

export default useStyles;
