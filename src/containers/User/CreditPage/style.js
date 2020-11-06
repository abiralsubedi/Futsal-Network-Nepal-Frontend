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
    maxWidth: "8rem",
    padding: "0.5rem"
  },
  tableContainer: {
    maxHeight: "25.125rem"
  },
  table: {
    minWidth: "17rem",
    border: `1px solid ${theme.palette.divider}`
  },
  tableHead: {
    fontSize: "1.125rem"
  },
  tableTitle: {
    fontSize: "1.375rem",
    color: theme.palette.text.secondary
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
