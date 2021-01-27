import "swiper/swiper.less";
import "./style.less";

import propTypes from "prop-types";
import React, { useState } from "react";

import { filterCompetitors } from "../../helpers/utils";
import { CompetitorsList } from "../competitors-list";

const CompetitorsSearch = ({ competitors }) => {
  const [searchString, setSearchString] = useState(``);
  const [isVisible, setIsVisible] = useState(false);

  const onSearchFilledChange = (evt) => {
    setSearchString(evt.currentTarget.value);
    if (evt.currentTarget.value.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleResetClick = () => {
    setSearchString("");
    setIsVisible(false);
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <input
          value={searchString}
          className="search__input"
          onChange={onSearchFilledChange}
          placeholder="Type Baby’s name"
        />

        {isVisible && (
          <button
            className="search__button text-pink"
            type="reset"
            onClick={handleResetClick}
          >
            Cancel
          </button>
        )}
      </div>

      {isVisible && (
        <CompetitorsList
          competitors={filterCompetitors(searchString, competitors)}
        />
      )}
    </div>
  );
};

CompetitorsSearch.propTypes = {
  competitors: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      avatar: propTypes.string.isRequired,
      likes: propTypes.number.isRequired,
      parentName: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default CompetitorsSearch;
