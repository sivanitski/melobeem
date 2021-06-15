import "./style.less";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  PaymentRequestButtonElement,
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
import Loader from "../animation/loader";

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
    priceCents: null,
    priceCurrency: null,
    country: null,
    productTitle: null,
  });
  const [message, setMessage] = useState(null);
  const [postalCode, { onChange: onChangePostal }] = useEventTarget({
    initialValue: "",
  });
  const [cardHolder, { onChange: onChangeCardHolder }] = useEventTarget({
    initialValue: "",
  });
  const [email, { onChange: onChangeEmail }] = useEventTarget({
    initialValue: "",
  });
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [requestButtonLoading, setRequestButtonLoading] = useState(true);
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(false);

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
        priceCents: res.data.priceCents,
        priceCurrency: res.data.priceCurrency,
        country: res.data.country,
        productTitle: res.data.productTitle,
      });
    }

    makeChargeIntent();
  }, []);

  useEffect(() => {
    if (stripe && stripeVariables.clientSecret != null) {
      const pr = stripe.paymentRequest({
        country: stripeVariables.country,
        currency: stripeVariables.priceCurrency,
        total: {
          label: stripeVariables.productTitle,
          amount: stripeVariables.priceCents,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }

        setRequestButtonLoading(false);
      });

      pr.on("paymentmethod", async (ev) => {
        const {
          paymentIntent,
          error: confirmError,
        } = await stripe.confirmCardPayment(
          stripeVariables.clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          console.error("[error]", confirmError);
          setMessage(confirmError.message);
          ev.complete("fail");
        } else {
          ev.complete("success");

          if (paymentIntent.status === "requires_source_action") {
            const { error } = await stripe.confirmCardPayment(
              stripeVariables.clientSecret
            );
            if (error) {
              console.error("[error]", error);
              setMessage(error.message);
            } else {
              paymentSucceeded();
            }
          } else {
            paymentSucceeded();
          }
        }
      });
    }
  }, [stripeVariables]);

  const paymentSucceeded = async () => {
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
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setPaymentButtonDisabled(true);

    if (!stripe || !elements) {
      setPaymentButtonDisabled(false);
      return;
    }

    if (!checkCustomFieldsValid()) {
      setPaymentButtonDisabled(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const payload = await stripe.confirmCardPayment(
      stripeVariables.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolder,
            email: email,
            address: {
              postal_code: postalCode,
            },
          },
        },
      }
    );

    if (payload.error) {
      console.error("[error]", payload.error);
      setMessage(payload.error.message);
      setPaymentButtonDisabled(false);
    } else {
      try {
        await api.post("/charges/payment_success", {
          purchaseTransactionId: stripeVariables.purchaseTransactionId,
        });

        setMessage("Operation succeeded. Please, wait till this window closes");

        if (activeType === "vote") {
          handlePaymentSucceedClose();
        } else {
          handlePaymentClose();
        }
      } catch (e) {
        setMessage("Something went wrong, please try again");
      }

      setPaymentButtonDisabled(false);
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
        lineHeight: "22px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#767676",
        },
        "::placeholder": {
          color: "#767676",
        },
      },
      invalid: {
        iconColor: "tomato",
        color: "tomato",
      },
    },
  };

  const checkCustomFieldsValid = () => {
    if (postalCode === "") {
      setMessage("Enter valid postcode");
      return false;
    }

    if (cardHolder === "" || cardHolder.length < 3) {
      setMessage("Enter valid name on card");
      return false;
    }

    if (email === "" || email.length < 5) {
      setMessage("Enter valid email address");
      return false;
    }

    return true;
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

  // console.log('requestButtonLoading', requestButtonLoading)

  if (requestButtonLoading) {
    return <Loader />;
  } else {
    return (
      <div className="vote-payment">
        <div className="vote-payment__close" onClick={handlePaymentClose}>
          <ButtonClose />
        </div>
        {renderImage()}
        <div className="vote-payment__product">{activeTitle}</div>
        {paymentRequest && (
          <div className="payment-payment_request_container">
            <PaymentRequestButtonElement options={{ paymentRequest }} />
            <div className="payment-delimiter-text-container">
              <p>
                <span>Or pay with card</span>
              </p>
            </div>
          </div>
        )}
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
            <hr></hr>
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
                value={postalCode}
                className="vote-payment__form-field--postcode vote-payment__form-field"
                onChange={onChangePostal}
              />
            </div>
          </div>
          <div className="vote-payment__user_details">
            <div className="vote-payment__item-full-width">
              <label htmlFor="cardHolder" className="vote-payment__text">
                Name on card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardHolder}
                className="vote-payment__form-field--cardholder vote-payment__form-field"
                onChange={onChangeCardHolder}
              />
            </div>
            <div className="vote-payment__item-full-width">
              <label htmlFor="email" className="vote-payment__text">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                className="vote-payment__form-field--email vote-payment__form-field"
                onChange={onChangeEmail}
              />
            </div>
          </div>

          {message && <div className="error">{message}</div>}

          <button
            type="submit"
            disabled={paymentButtonDisabled}
            className={
              paymentButtonDisabled
                ? "button vote-payment__button vote-payment__button-disabled"
                : "button vote-payment__button"
            }
          >
            Pay {activePrice}
          </button>
        </form>
      </div>
    );
  }
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
