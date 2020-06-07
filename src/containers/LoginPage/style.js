import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  content: {
    background: "#74C35A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  loginScreen: {
    background: "#fff",
    padding: "2rem",
    "& input": {
      display: "block",
      margin: "1rem 0",
      padding: "0.5rem"
    }
  },
  cursorPointer: {
    cursor: "pointer"
  }
}));

export default useStyles;
