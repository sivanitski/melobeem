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
import React, { useState } from "react";

import { createAPI } from "../../api";
import ButtonClose from "../../images/close-icon.svg";
import HeartImage from "../../images/heart-payment.svg";

const VotePayment = ({
  activePrice,
  activeVoteAmount,
  handlePaymentClose,
  childId,
  userId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [value, { onChange: onChangePostal }] = useEventTarget({
    initialValue: "",
  });

  const api = createAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          postal_code: value,
        },
      },
    });

    if (payload.error) {
      console.log("[error]", payload.error);
      setErrorMessage(payload.error.message);
    } else {
      try {
        setErrorMessage(null);
        await api.post(`/charges`, {
          entryId: childId,
          voteValue: activeVoteAmount,
          userId: userId,
        });

        handlePaymentClose();
      } catch (e) {
        setErrorMessage("Something went wrong, please try again");
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

  return (
    <div className="vote-payment">
      <div className="vote-payment__close" onClick={handlePaymentClose}>
        <ButtonClose />
      </div>
      <HeartImage className="vote-payment__img" />
      <div className="vote-payment__product">{activeVoteAmount} votes</div>
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

        {errorMessage && <div className="error">{errorMessage}</div>}

        <button
          type="submit"
          disabled={!stripe}
          className="button vote-payment__button"
        >
          Pay £ {activePrice}
        </button>
      </form>
    </div>
  );
};

VotePayment.propTypes = {
  activePrice: propTypes.string.isRequired,
  activeVoteAmount: propTypes.string.isRequired,
  handlePaymentClose: propTypes.func.isRequired,
  childId: propTypes.number.isRequired,
  userId: propTypes.number.isRequired,
};

export default VotePayment;
