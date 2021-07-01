import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";

import { api } from "../../../api";
import SpinnerOrange from "../../../images/spinner-orange-small.svg";
import SpinnerPurple from "../../../images/spinner-purple-small.svg";
import Loader from "../../animation/loader";
import SpinnerTitle from "./spinner-title";

const SpinnerList = ({ handlePriceClick, withAnimation }) => {
  const getSpinOptions = () => {
    return api.get("/products", { params: { product_type: "spinner" } });
  };

  const { data: spinOptions, loading } = useRequest(getSpinOptions, {
    formatResult: (res) => res.data.products,
  });

  if (loading && !withAnimation) {
    return <Loader />;
  }

  if (loading) {
    return "";
  } else {
    return (
      <div className="spinner">
        <SpinnerTitle />
        <div className="spinner-list">
          {spinOptions.map((spinOption, index) => (
            <div
              className={`spinner-item ${
                withAnimation ? `spinner-zoom-in-product-${index}` : ""
              }`}
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
  }
};

SpinnerList.propTypes = {
  handlePriceClick: propTypes.func.isRequired,
  withAnimation: propTypes.bool,
};

export default SpinnerList;
