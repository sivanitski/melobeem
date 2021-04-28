import propTypes from "prop-types";
import React, { useState } from "react";

import { Payment } from "../../payment";
import SpinnerList from "../blocks/spinner-list";

const NoSpinner = ({ infoTitle, infoText }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeOption, setActiveOption] = useState({
    price: null,
    amount: null,
  });

  const handlePriceClick = (option) => {
    setActiveOption(option);
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    setActiveOption(null);
  };

  if (isPaymentOpen) {
    return (
      <Payment
        activeType="spinner"
        activePrice={activeOption.price}
        activeAmount={activeOption.amount}
        handlePaymentClose={handlePaymentClose}
      />
    );
  }

  return (
    <SpinnerList
      handlePriceClick={handlePriceClick}
      infoTitle={infoTitle}
      infoText={infoText}
    />
  );
};

NoSpinner.propTypes = {
  infoTitle: propTypes.string.isRequired,
  infoText: propTypes.string.isRequired,
};

export default NoSpinner;
