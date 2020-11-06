import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  infoLoadingWrapper: {
    height: "25rem"
  },
  informationButtonRoot: {
    marginTop: "2.5rem",
    maxWidth: "12rem"
  },
  userImageContainer: {
    marginBottom: "2rem"
  },
  vendorGroupText: {
    margin: "1.5rem 0 1rem",
    color: theme.palette.text.secondary
  },
  fieldGroup: {
    display: "flex"
  },
  fieldActionItems: {
    display: "flex"
  },
  fieldActionIcon: {
    "&:hover": {
      background: "inherit"
    }
  }
}));

export default useStyles;
