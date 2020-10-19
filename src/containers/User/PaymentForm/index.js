import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import Button from "components/Button";

import { updateCreditAmount } from "containers/LoginPage/actions";
import { postPaymentIntent, clearMessage } from "./actions";

import useStyles from "./style";
import "./style.css";

const useOptions = () => {
  const fontSize = "16px";
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#272121",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#A5A9B6"
          }
        },
        invalid: {
          color: "#f44336"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const PaymentForm = ({
  onPostPaymentIntent,
  onClearPaymentMessage,
  addCreditData,
  globalData,
  onUpdateCreditAmount,
  amount
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const { postPaymentIntentSuccess, postPaymentIntentLoading } = addCreditData;
  const {
    profile: { emailAddress }
  } = globalData;

  const [completePaymentLoading, setCompletePaymentLoading] = useState(false);

  useEffect(() => {
    onPostPaymentIntent({
      amount: amount * 100,
      currency: "usd",
      emailAddress
    });
    return () => {
      onClearPaymentMessage();
    };
  }, []);

  const handlePaymentCompletion = async event => {
    event.preventDefault();
    setCompletePaymentLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { clientSecret } = postPaymentIntentSuccess;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          email: emailAddress
        }
      }
    });
    if (result.error) {
      enqueueSnackbar(result.error.message, {
        variant: "error"
      });
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const { amount } = result.paymentIntent;
        const receivedAmount = amount / 100;

        await new Promise(resolve => {
          setTimeout(() => {
            onUpdateCreditAmount(receivedAmount);
            enqueueSnackbar(`Your payment is successful.`, {
              variant: "success"
            });
            resolve("success");
          }, 2000);
        });
      }
    }
    setCompletePaymentLoading(false);
  };

  return (
    <div className="payment-form">
      <form onSubmit={handlePaymentCompletion} className={classes.formContent}>
        <label>
          <Typography>Card number</Typography>
          <CardNumberElement options={options} onReady={el => el.focus()} />
        </label>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <label>
              <Typography>Expiration date</Typography>
              <CardExpiryElement options={options} />
            </label>
          </Grid>
          <Grid item sm={6} xs={12}>
            <label>
              <Typography>CVC</Typography>
              <CardCvcElement options={options} />
            </label>
          </Grid>
        </Grid>
        <div className={classes.paymentButtonWrapper}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            buttonRootClass={classes.paymentButtonRoot}
            buttonText={`Pay USD ${amount}`}
            type="submit"
            actionLoading={completePaymentLoading}
            disabled={
              !stripe || postPaymentIntentLoading || completePaymentLoading
            }
          />
        </div>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  onPostPaymentIntent: PropTypes.func,
  onClearPaymentMessage: PropTypes.func,
  addCreditData: PropTypes.object,
  globalData: PropTypes.object,
  onUpdateCreditAmount: PropTypes.func,
  amount: PropTypes.number
};

const mapStateToProps = state => ({
  addCreditData: state.PaymentFormReducer,
  globalData: state.LoginReducer
});

const mapDispatchToProps = dispatch => ({
  onPostPaymentIntent: data => dispatch(postPaymentIntent(data)),
  onUpdateCreditAmount: data => dispatch(updateCreditAmount(data)),
  onClearPaymentMessage: () => dispatch(clearMessage())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PaymentForm);
