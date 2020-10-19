import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "containers/User/PaymentForm";
import Modal from "components/Modal";
import Button from "components/Button";
import TextField from "components/TextField";

import { toggleAddCreditModal } from "containers/LoginPage/actions";

import useStyles from "./style";

const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;

const AddCreditModal = ({ globalData, onToggleCreditModal, topUpAmount }) => {
  const classes = useStyles();
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY || "");

  const { addCreditModalActive } = globalData;

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(true);
  const [notEnoughMessage, setNotEnoughMessage] = useState(false);
  const [isPaymentScreen, setIsPaymentScreen] = useState(false);

  useEffect(() => {
    if (!addCreditModalActive) {
      setAmount(0);
      setAmountError(true);
      setIsPaymentScreen(false);
    }
    if (addCreditModalActive && topUpAmount) {
      setAmountError(false);
      setNotEnoughMessage(true);
      setAmount(topUpAmount);
    }
  }, [addCreditModalActive]);

  const handleContinue = () => {
    if (amount >= 5 && amount <= 30000) {
      setIsPaymentScreen(prev => !prev);
    }
  };

  const errorMessageMemo = useMemo(() => {
    if (notEnoughMessage) {
      return "You do not have enough balance. Please top up given amount.";
    }
    if (amountError) {
      return "Amount should be between 5 and 30000";
    }
    return "";
  }, [amountError, notEnoughMessage]);

  return (
    <Modal
      open={addCreditModalActive}
      handleClose={() => {
        onToggleCreditModal(false);
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
              setNotEnoughMessage(false);
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
            helperText={errorMessageMemo}
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
  onToggleCreditModal: PropTypes.func,
  topUpAmount: PropTypes.number
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  onToggleCreditModal: data => dispatch(toggleAddCreditModal(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddCreditModal);
