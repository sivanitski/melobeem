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
import gsap from "gsap";
import propTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import Lottie from "react-lottie-player";

import { api } from "../../api";
import ButtonClose from "../../images/close-icon.svg";
import HeartImage from "../../images/heart-payment.svg";
import LockerImage from "../../images/locker-payment.svg";
import paymentFailedLottie from "../../images/payment-failed.json";
import paymentSuccessLottie from "../../images/payment-successes.json";
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
  const paymentRef = useRef(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(null);
  const [isFailedVisible, setIsFailedVisible] = useState(null);
  const [message, setMessage] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [requestButtonLoading, setRequestButtonLoading] = useState(true);
  const [paymentButtonDisabled, setPaymentButtonDisabled] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [cvcError, setCvcError] = useState(null);
  const [cardHolderError, setCardHolderError] = useState(null);

  const [postalCode, { onChange: onChangePostal }] = useEventTarget({
    initialValue: "",
  });
  const [cardHolder, setCardHolder] = useState("");
  const [email, setEmail] = useState("");

  const trackEvent = (userId, event, eventName, event_details) => {
    let json = JSON.stringify({
      tk: "riuerunb3UIBBINIn2in23ibbYB@UYBBoi4oon12b124",
      event: {
        site: "melobeem",
        event: event,
        event_name: eventName,
        user_id: userId,
        user_token: localStorage.getItem("tk"),
        event_description: event_details,
      },
    });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    };

    fetch("http://localhost:3031/events", requestOptions);
  };

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

      dataLayer.push({
        event: "AddToCart",
        type: activeType,
        title: res.data.productTitle,
        currency: res.data.priceCurrency,
        value: res.data.priceCents / 100,
      });
      ReactPixel.track("AddToCart", {
        currency: res.data.priceCurrency,
        value: res.data.priceCents / 100,
        content_name: activeType,
      });

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

        trackEvent(
          userId,
          "click",
          "payment-details-entered-pay-button",
          stripeVariables
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
              await paymentSucceeded();
            }
          } else {
            await paymentSucceeded();
          }
        }
      });
    }
  }, [stripeVariables]);

  const paymentSucceeded = async () => {
    trackEvent(userId, "click", "payment-confirmed", stripeVariables);

    try {
      await api.post("/charges/payment_success", {
        purchaseTransactionId: stripeVariables.purchaseTransactionId,
      });
      dataLayer.push({
        event: "purchase",
        type: activeType,
        title: activeTitle,
        currency: stripeVariables.priceCurrency,
        value: stripeVariables.priceCents / 100,
      });
      ReactPixel.track("Purchase", {
        currency: stripeVariables.priceCurrency,
        value: stripeVariables.priceCents / 100,
        content_name: activeTitle,
      });

      gsap.to(paymentRef.current, {
        y: "100%",
        autoAlpha: 0,
        duration: 1,
        onComplete: () => {
          setIsSuccessVisible(true);
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
          setTimeout(() => {
            if (activeType === "vote") {
              handlePaymentSucceedClose();
            } else {
              handlePaymentClose();
            }
          }, 1500);
        },
      });
    } catch (e) {
      gsap
        .timeline()
        .to(paymentRef.current, {
          y: "100%",
          autoAlpha: 0,
          duration: 1,
          onComplete: () => {
            setIsFailedVisible(true);
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
            setTimeout(() => {
              setIsFailedVisible(false);
            }, 1500);
          },
        })
        .to(
          paymentRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
          },
          2.5
        );

      setMessage("Something went wrong, please try again");
    }
  };

  const handleCardChange = (evt) => {
    if (evt.error) {
      setCardError("Your card number is invalid");
    } else {
      setCardError(null);
    }
  };

  const handleExpiryChange = (evt) => {
    if (evt.error) {
      setExpiryError("Invalid date");
    } else {
      setExpiryError(null);
    }
  };

  const handleCvcChange = (evt) => {
    if (evt.error) {
      setCvcError("Invalid CVC");
    } else {
      setCvcError(null);
    }
  };

  const EMAIL_VALIDATION = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (value) => {
    if (!EMAIL_VALIDATION.test(value)) {
      setEmailError("Enter valid email address");
    } else {
      setEmailError(null);
    }
  };

  const validateCardHolder = (value) => {
    if (value.length < 3) {
      setCardHolderError("Invalid name on card");
    } else {
      setCardHolderError(null);
    }
  };

  const timeoutCardHolderRef = useRef(null);
  useEffect(() => {
    if (timeoutCardHolderRef.current !== null) {
      clearTimeout(timeoutCardHolderRef.current);
    }

    timeoutCardHolderRef.current = setTimeout(() => {
      timeoutCardHolderRef.current = null;
      cardHolder !== "" ? validateCardHolder(cardHolder) : null;
    }, 500);
  }, [cardHolder]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setPaymentButtonDisabled(true);

    if (!stripe || !elements) {
      setPaymentButtonDisabled(false);
      return;
    }

    validateEmail(email);
    validateCardHolder(cardHolder);
    if (emailError || expiryError || cardError || cvcError || cardHolderError) {
      setPaymentButtonDisabled(false);
      return;
    }

    trackEvent(userId, "click", "payment-details-entered", stripeVariables);

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

        dataLayer.push({
          event: "purchase",
          type: activeType,
          title: activeTitle,
          currency: stripeVariables.priceCurrency,
          value: stripeVariables.priceCents / 100,
        });
        ReactPixel.track("Purchase", {
          currency: stripeVariables.priceCurrency,
          value: stripeVariables.priceCents / 100,
          content_name: activeTitle,
        });

        gsap.to(paymentRef.current, {
          y: "100%",
          autoAlpha: 0,
          duration: 1,
          onComplete: () => {
            setIsSuccessVisible(true);
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
            setTimeout(() => {
              if (activeType === "vote") {
                handlePaymentSucceedClose();
              } else {
                handlePaymentClose();
              }
            }, 1500);
          },
        });
      } catch (e) {
        gsap
          .timeline()
          .to(paymentRef.current, {
            y: "100%",
            autoAlpha: 0,
            duration: 1,
            onComplete: () => {
              setIsFailedVisible(true);
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
              setTimeout(() => {
                setIsFailedVisible(false);
              }, 1500);
            },
          })
          .to(
            paymentRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
            },
            2.5
          );

        setMessage("Something went wrong, please try again");
      }

      setPaymentButtonDisabled(false);
    }
  };

  const ELEMENT_OPTIONS = {
    placeholder: "",
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
      },
    },
  };

  const EXPIRY_OPTIONS = {
    placeholder: "MM/YY",
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

  if (requestButtonLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div
          style={{
            overflow: "hidden",
            position: "absolute",
            left: "-12px",
            width: "100%",
            top: "200px",
          }}
        >
          {isSuccessVisible ? (
            <Lottie
              loop={false}
              animationData={paymentSuccessLottie}
              play
              style={{
                transform: "translateX(-50%)",
                marginLeft: "50%",
                width: "200vw",
              }}
            />
          ) : null}
          {isFailedVisible ? (
            <Lottie
              loop={false}
              animationData={paymentFailedLottie}
              play
              style={{
                transform: "translateX(-50%)",
                marginLeft: "50%",
                width: "200vw",
              }}
            />
          ) : null}
        </div>

        {
          <div className="vote-payment" ref={paymentRef}>
            <div className="vote-payment__close" onClick={handlePaymentClose}>
              <ButtonClose />
            </div>
            {renderImage()}
            <div className="vote-payment__product">{activeTitle}</div>
            {paymentRequest && (
              <div className="payment__option-container">
                <PaymentRequestButtonElement options={{ paymentRequest }} />

                <div className="payment-delimiter-text-container payment__text-option">
                  <span>Or pay with card</span>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="vote-payment__form">
              <div className="vote-payment__card vote-payment__item">
                <label
                  htmlFor="cardNumber"
                  className="vote-payment__text vote-payment__text--card-number"
                >
                  Card Number
                  <LockerImage />
                </label>
                <CardNumberElement
                  id="cardNumber"
                  options={ELEMENT_OPTIONS}
                  className="vote-payment__form-field--card-number vote-payment__form-field"
                  onChange={(evt) => handleCardChange(evt)}
                />
                <span className="text-red text-tiny vote-payment__validation">
                  {cardError}
                </span>
              </div>
              <div className="vote-payment__options">
                <div className="vote-payment__item vote-payment__item--expiry">
                  <label htmlFor="expiry" className="vote-payment__text">
                    Expiry
                  </label>
                  <CardExpiryElement
                    id="expiry"
                    options={EXPIRY_OPTIONS}
                    className="vote-payment__form-field--card-expire  vote-payment__form-field"
                    onChange={(evt) => handleExpiryChange(evt)}
                  />
                  <span className="text-red text-tiny vote-payment__validation">
                    {expiryError}
                  </span>
                </div>
                <div className="vote-payment__item vote-payment__item--cvc">
                  <label htmlFor="cvc" className="vote-payment__text">
                    CVC
                  </label>
                  <CardCvcElement
                    id="cvc"
                    options={ELEMENT_OPTIONS}
                    className="vote-payment__form-field--card-cvc vote-payment__form-field"
                    onChange={(evt) => handleCvcChange(evt)}
                    placeholder={null}
                  />
                  <span className="text-red text-tiny vote-payment__validation">
                    {cvcError}
                  </span>
                </div>
                <div className="vote-payment__item vote-payment__item--postcode">
                  <label htmlFor="postal" className="vote-payment__text">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    maxLength={7}
                    className="vote-payment__form-field--postcode vote-payment__form-field"
                    onChange={onChangePostal}
                  />
                </div>
              </div>
              <div className="vote-payment__user_details">
                <div className="vote-payment__item-full-width vote-payment__item">
                  <label htmlFor="cardHolder" className="vote-payment__text">
                    Name on card
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    className="vote-payment__form-field--cardholder vote-payment__form-field"
                    onChange={(evt) => setCardHolder(evt.target.value)}
                  />
                  <span className="text-red text-tiny vote-payment__validation">
                    {cardHolderError}
                  </span>
                </div>
                <div className="vote-payment__item-full-width vote-payment__item">
                  <label htmlFor="email" className="vote-payment__text">
                    Email
                  </label>
                  <input
                    autoComplete="false"
                    type="email"
                    value={email}
                    className="vote-payment__form-field--email vote-payment__form-field"
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                  <span className="text-red text-tiny vote-payment__validation">
                    {emailError}
                  </span>
                </div>
              </div>

              {message && <div className="error">{message}</div>}

              <button
                type="submit"
                disabled={paymentButtonDisabled}
                id={`click_on_pay_button_${activeType}`}
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
        }
      </>
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
