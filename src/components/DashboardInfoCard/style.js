import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dashboardCardRoot: {
    padding: "1rem",
    minHeight: "10rem",
    color: "#fbfbfb"
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "2rem"
  },
  cardIcon: {
    "& svg": {
      fontSize: "3rem"
    }
  }
}));

export default useStyles;
