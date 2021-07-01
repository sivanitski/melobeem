import propTypes from "prop-types";
import React, { useState } from "react";

import { Payment } from "../../payment";
import SpinnerList from "../blocks/spinner-list";

const NoSpinner = ({ requestSpinnerInfo, updateUser, withAnimation }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeOption, setActiveOption] = useState({
    price: null,
    value: null,
    title: null,
    id: null,
  });

  const handlePriceClick = (option) => {
    setActiveOption(option);
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    setActiveOption(null);
    updateUser();
    requestSpinnerInfo();
  };

  if (isPaymentOpen) {
    return (
      <Payment
        activeType="spinner"
        activePrice={activeOption.price}
        activeAmount={activeOption.value}
        handlePaymentClose={handlePaymentClose}
        activeTitle={activeOption.title}
        activeId={activeOption.id}
      />
    );
  }

  return (
    <SpinnerList
      handlePriceClick={handlePriceClick}
      withAnimation={withAnimation}
    />
  );
};

NoSpinner.propTypes = {
  requestSpinnerInfo: propTypes.func.isRequired,
  updateUser: propTypes.func,
  withAnimation: propTypes.bool,
};

export default NoSpinner;
