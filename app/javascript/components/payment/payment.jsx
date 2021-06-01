import "./style.less";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEventTarget } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { api } from "../../api";
import ButtonClose from "../../images/close-icon.svg";
import HeartImage from "../../images/heart-payment.svg";
import SpinnerOrange from "../../images/spinner-orange-small.svg";
import SpinnerPurple from "../../images/spinner-purple-small.svg";

const Payment = ({
  activeType,
  activePrice,
  activeTitle,
  activeId,
  activeAmount,
  handlePaymentSucceedClose,
  handlePaymentClose,
  childId,
  userId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeVariables, setStipeVariables] = useState({
    clientSecret: null,
    purchaseTransactionId: null,
  });
  const [message, setMessage] = useState(null);
  const [value, { onChange: onChangePostal }] = useEventTarget({
    initialValue: "",
  });

  useEffect(() => {
    async function makeChargeIntent() {
      let res;
      if (activeType === "vote") {
        res = await api.post(`/charges/buy_votes`, {
          entryId: childId,
          userId: userId,
          productId: activeId,
        });
      } else {
        res = await api.post(`charges/buy_spins`, {
          productId: activeId,
        });
      }
      setStipeVariables({
        purchaseTransactionId: res.data.purchaseTransactionId,
        clientSecret: res.data.clientSecret,
      });
    }

    makeChargeIntent();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setMessage("Process is running");

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const payload = await stripe.confirmCardPayment(
      stripeVariables.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              postal_code: value,
            },
          },
        },
      }
    );

    if (payload.error) {
      console.error("[error]", payload.error);
      setMessage(payload.error.message);
    } else {
      try {
        await api.post("/charges/payment_success", {
          purchaseTransactionId: stripeVariables.purchaseTransactionId,
        });

        if (activeType === "vote") {
          handlePaymentSucceedClose();
        }
        handlePaymentClose();
        setMessage("Operation succeeded. Please, wait till this window closes");
      } catch (e) {
        setMessage("Something went wrong, please try again");
      }
    }
  };

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        iconColor: "black",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#747474",
        },
        "::placeholder": {
          color: "#747474",
        },
      },
      invalid: {
        iconColor: "tomato",
        color: "tomato",
      },
    },
  };

  const renderImage = () => {
    if (activeType === "vote") {
      return <HeartImage className="vote-payment__img" />;
    }

    if (activeAmount > 5) {
      return <SpinnerOrange className="vote-payment__img" />;
    }

    return <SpinnerPurple className="vote-payment__img" />;
  };

  return (
    <div className="vote-payment">
      <div className="vote-payment__close" onClick={handlePaymentClose}>
        <ButtonClose />
      </div>
      {renderImage()}
      <div className="vote-payment__product">{activeTitle}</div>
      <form onSubmit={handleSubmit} className="vote-payment__form">
        <div className="vote-payment__card">
          <label htmlFor="cardNumber" className="vote-payment__text">
            Card Number
          </label>
          <CardNumberElement
            id="cardNumber"
            options={ELEMENT_OPTIONS}
            className="vote-payment__form-field--card-number vote-payment__form-field"
          />
        </div>
        <div className="vote-payment__options">
          <div className="vote-payment__item">
            <label htmlFor="expiry" className="vote-payment__text">
              Expiry
            </label>
            <CardExpiryElement
              id="expiry"
              options={ELEMENT_OPTIONS}
              className="vote-payment__form-field--card-expire vote-payment__form-field"
            />
          </div>
          <div className="vote-payment__item">
            <label htmlFor="cvc" className="vote-payment__text">
              CVV
            </label>
            <CardCvcElement
              id="cvc"
              options={ELEMENT_OPTIONS}
              className="vote-payment__form-field--card-cvc vote-payment__form-field"
            />
          </div>
          <div className="vote-payment__item">
            <label htmlFor="postal" className="vote-payment__text">
              Postcode
            </label>
            <input
              type="number"
              placeholder="12345"
              value={value}
              className="vote-payment__form-field--postcode vote-payment__form-field"
              onChange={onChangePostal}
            />
          </div>
        </div>

        {message && <div className="error">{message}</div>}

        <button
          type="submit"
          disabled={!stripe}
          className="button vote-payment__button"
        >
          Pay {activePrice}
        </button>
      </form>
    </div>
  );
};

Payment.propTypes = {
  activeType: propTypes.string.isRequired,
  activePrice: propTypes.string.isRequired,
  activeAmount: propTypes.number,
  handlePaymentClose: propTypes.func.isRequired,
  handlePaymentSucceedClose: propTypes.func,
  childId: propTypes.number,
  userId: propTypes.number,
  activeTitle: propTypes.string.isRequired,
  activeId: propTypes.number.isRequired,
};

export default Payment;
