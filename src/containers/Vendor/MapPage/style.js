import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mapWrapper: {
    "& .gm-style-iw.gm-style-iw-c": {
      paddingRight: "12px !important"
    }
  },
  markerDescription: {
    color: theme.palette.grey[900]
  },
  loadingWrapper: {
    height: "18rem"
  }
}));

export default useStyles;
