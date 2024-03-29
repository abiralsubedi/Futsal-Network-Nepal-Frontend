import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  addHourContent: {
    marginTop: "1rem"
  },
  addPriceField: {
    margin: "2rem 0"
  },
  addHourButtonRoot: {
    maxWidth: "8rem",
    padding: "8px 16px"
  },
  controlLabelRoot: {
    marginBottom: "1.5rem"
  },
  controlLabel: {
    fontWeight: 600,
    marginLeft: "-1rem",
    marginRight: "1rem"
  }
}));

export default useStyles;
