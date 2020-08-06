import React, { useState, useEffect } from "react";
import PropTypes, { number } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "containers/PaymentForm";
import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";

import { toggleAddCreditModal } from "containers/LoginPage/actions";

import useStyles from "./style";

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;

const AddCreditModal = ({ globalData, onToggleCreditModal }) => {
  const classes = useStyles();
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);

  const { addCreditModalActive } = globalData;

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(true);
  const [isPaymentScreen, setIsPaymentScreen] = useState(false);

  const handleContinue = () => {
    if (amount >= 5) {
      setIsPaymentScreen(prev => !prev);
    }
  };

  return (
    <Modal
      open={addCreditModalActive}
      handleClose={() => {
        onToggleCreditModal(false);
        setAmount(0);
        setAmountError(true);
        setIsPaymentScreen(false);
      }}
      title="Add Credit Balance"
    >
      <div className={classes.addCreditContent}>
        {!isPaymentScreen && (
          <TextField
            id="top-up-amount"
            label="Amount"
            value={amount || ""}
            handleChange={val => {
              const updatedAmount = Math.ceil(+val);
              setAmount(updatedAmount);
              if (updatedAmount >= 5 && updatedAmount <= 30000) {
                setAmountError(false);
              } else {
                setAmountError(true);
              }
            }}
            autoFocus
            required
            fullWidth
            type="number"
            onKeyPress={({ key }) => {
              if (key === "Enter") {
                handleContinue();
              }
            }}
            helperText={amountError && "Amount should be between 5 and 30000"}
          />
        )}
        {isPaymentScreen && (
          <Elements stripe={stripePromise}>
            <PaymentForm amount={amount} />
          </Elements>
        )}
        {!isPaymentScreen && (
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            buttonRootClass={classes.continuePayButton}
            buttonText="Continue"
            onClick={handleContinue}
            disabled={amountError}
          />
        )}
      </div>
    </Modal>
  );
};

AddCreditModal.propTypes = {
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

export default compose(withConnect)(AddCreditModal);
