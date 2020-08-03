import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  creditBalanceContainer: {
    marginBottom: "2rem"
  },
  balance: {
    fontSize: "1.25rem",
    // marginRight: "2rem",
    "& span": {
      fontSize: "2rem"
    }
  },
  creditButtonRoot: {
    maxWidth: "8rem"
  }
}));

export default useStyles;
