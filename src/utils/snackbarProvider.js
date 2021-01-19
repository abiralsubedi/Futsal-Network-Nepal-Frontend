import React from "react";
import PropTypes from "prop-types";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  snackBarRoot: {
    maxWidth: "28rem",
    "& .MuiSnackbarContent-root": {
      padding: "0.8rem",
      fontSize: "0.935rem"
    }
  },
  snackBarButton: {
    color: theme.palette.common.white,
    fontWeight: 600
  }
}));

const SnackBarProviderWrapper = ({ children }) => {
  const classes = useStyles();

  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={4}
      ref={notistackRef}
      action={key => (
        <Button
          onClick={onClickDismiss(key)}
          className={classes.snackBarButton}
          data-cy="snackbar-item-dismiss"
        >
          Dismiss
        </Button>
      )}
      autoHideDuration={80000}
      classes={{
        root: classes.snackBarRoot
      }}
      data-cy="snackbar-item"
    >
      {children}
    </SnackbarProvider>
  );
};

SnackBarProviderWrapper.propTypes = {
  children: PropTypes.node
};

export default SnackBarProviderWrapper;
