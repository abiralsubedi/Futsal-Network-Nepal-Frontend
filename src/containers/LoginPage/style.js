import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  // loginScreen: {
  //   padding: "2rem",
  //   "& input": {
  //     display: "block",
  //     margin: "1rem 0",
  //     padding: "0.5rem"
  //   },
  //   background: theme.palette.common.grey2
  // },
  loginTextField: {
    margin: "1rem 0"
  },
  title: {
    color: theme.palette.common.headerColor
  },
  cursorPointer: {
    cursor: "pointer"
  }
}));

export default useStyles;
