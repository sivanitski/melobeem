import { useRequest } from "ahooks";
import { Elastic, gsap } from "gsap";
import propTypes from "prop-types";
import React, { useCallback } from "react";

import { api } from "../../../api";
import SpinnerOrange from "../../../images/spinner-orange-small.svg";
import SpinnerPurple from "../../../images/spinner-purple-small.svg";
import Loader from "../../animation/loader";
import SpinnerTitle from "./spinner-title";

const SpinnerList = ({ handlePriceClick }) => {
  const getSpinOptions = () => {
    return api.get("/products", { params: { product_type: "spinner" } });
  };

  const { data: spinOptions, loading } = useRequest(getSpinOptions, {
    formatResult: (res) => res.data.products,
  });

  const spinnerListRef = useCallback((node) => {
    if (node) {
      const paymentCards = node.querySelectorAll(".spinner-item");
      gsap.fromTo(
        paymentCards,
        { scale: 0 },
        {
          scale: 1,
          duration: 1,
          stagger: 0.5,
          ease: Elastic.easeOut.config(1, 0.6),
        }
      );
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="spinner">
      <SpinnerTitle />
      <div className="spinner-list" ref={spinnerListRef}>
        {spinOptions.map((spinOption, index) => (
          <div
            className={`spinner-item spinner-zoom-in-product-${index}`}
            key={spinOption.id}
          >
            <div className="spinner-item__img">
              {index % 2 ? <SpinnerOrange /> : <SpinnerPurple />}
            </div>
            <div className="spinner-item__text">{spinOption.title}</div>
            <div
              className="button spinner-item__button"
              onClick={() => handlePriceClick(spinOption)}
            >
              {spinOption.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SpinnerList.propTypes = {
  handlePriceClick: propTypes.func.isRequired,
};

export default SpinnerList;
