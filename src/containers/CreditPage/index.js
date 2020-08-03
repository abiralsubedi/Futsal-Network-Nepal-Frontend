import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from "components/Button";
import AddCreditModal from "components/AddCreditModal";

import { toggleAddCreditModal } from "containers/LoginPage/actions";
import useStyles from "./style";

const CreditPage = ({ globalData, onToggleCreditModal }) => {
  const classes = useStyles();

  const {
    profile: { fullName, credit }
  } = globalData;

  return (
    <div className={classes.creditPageContent}>
      <AddCreditModal />
      <Grid container spacing={3} alignItems="center">
        <Grid item md={4} lg={3}>
          <Typography className={classes.balance}>
            Balance: <span>{credit}</span> USD
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            onClick={() => onToggleCreditModal(true)}
            buttonRootClass={classes.creditButtonRoot}
            buttonText="Add Credit"
          />
        </Grid>
      </Grid>
      <Typography>
        Hello <strong>{fullName}</strong>, Welcome to ongoing dashboard. Please
        visit your profile <Link to="/profile/change-password">here</Link>.
      </Typography>
    </div>
  );
};

CreditPage.propTypes = {
  globalData: PropTypes.object,
  onToggleCreditModal: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  onToggleCreditModal: data => dispatch(toggleAddCreditModal(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreditPage);
