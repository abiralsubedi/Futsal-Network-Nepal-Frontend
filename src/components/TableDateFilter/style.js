import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dateFilterWrapper: {
    marginBottom: "1rem"                                                                      
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
  filterButtonRoot: {
    maxWidth: "8rem",
    padding: "0.5rem"
  }
}));

export default useStyles;
