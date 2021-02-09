import propTypes from "prop-types";
import React from "react";

const HeaderUserItem = ({ title, value }) => {
  return (
    <div className="header-user__item">
      <div className="header-user__item__text text-tiny text-grey">{title}</div>
      <div className="header-user__item__number headline--medium text-pink">
        {value}
      </div>
    </div>
  );
};

HeaderUserItem.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
};

export default HeaderUserItem;
