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
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
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
      setClientSecret(res.data.clientSecret);
    }

    makeChargeIntent();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          address: {
            postal_code: value,
          },
        },
      },
    });

    if (payload.error) {
      console.error("[error]", payload.error);
      setErrorMessage(payload.error.message);
      setProcessing(false);
    } else {
      setErrorMessage(null);
      setProcessing(false);
      setSucceeded(true);

      if (activeType === "vote") {
        setErrorMessage("Please, wait till this window closes");
        // We dont have websockets now to get the call from back
        setTimeout(handlePaymentSucceedClose, 5000);
      } else {
        handlePaymentClose();
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

        {errorMessage && <div className="error">{errorMessage}</div>}
        {succeeded && <div>Operation succeeded</div>}
        {processing && <div>Process is running</div>}

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
