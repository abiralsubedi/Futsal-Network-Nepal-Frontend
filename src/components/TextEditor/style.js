import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  editorToolBarRoot: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    background: theme.palette.common.cardLightDarkColor
  },
  editorContentRoot: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    padding: "0 1rem"
  },
  blockTypeRoot: {
    color: theme.palette.grey[900]
  },
  fontSizeRoot: {
    color: theme.palette.grey[900]
  },
  colorPickerPopupRoot: {
    color: theme.palette.grey[900]
  },
  linkPopupRoot: {
    color: theme.palette.grey[900]
  }
}));

export default useStyles;
