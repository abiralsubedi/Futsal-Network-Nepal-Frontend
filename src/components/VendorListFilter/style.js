import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  vendorListSearchButton: {
    padding: "8px 16px",
    margin: "1rem 0 4px 0",
    width: "7rem",
    marginRight: "1rem"
  },
  filterFormContent: {
    padding: "1rem 2rem 1rem"
  },
  filterModalContent: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  },
  fieldTitle: {
    marginTop: "1.5rem"
  },
  pageTitle: {
    marginBottom: "1.5rem",
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
