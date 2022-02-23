import "swiper/swiper.less";
import "./style.less";

import React, { useEffect, useState } from "react";

import { createAPI } from "../../api";
import useDebounce from "../../helpers/use-debounce";
import { CompetitorsList } from "../competitors-list";

const CompetitorsSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const api = createAPI();
  const debouncedValue = useDebounce(searchString, 500);

  useEffect(() => {
    api.get(`/entries/search?q=${debouncedValue}`).then((res) => {
      setCompetitors(res.data.entries);
    });
  }, [debouncedValue]);

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

      {isVisible && <CompetitorsList competitors={competitors} />}
    </div>
  );
};

export default CompetitorsSearch;
