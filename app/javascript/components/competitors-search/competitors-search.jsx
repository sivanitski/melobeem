import "swiper/swiper.less";
import "./style.less";

import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import useDebounce from "../../helpers/use-debounce";
import { CompetitorsList } from "../competitors-list";
import { Footer } from "../footer";

const CompetitorsSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [children, setChildren] = useState([]);
  const [isMoreChildren, setIsMoreChildren] = useState(true);
  const [page, setPage] = useState(1);

  const debouncedValue = useDebounce(searchString, 500);
  const history = useHistory();

  useEffect(() => {
    getMatchedChildren();
  }, [debouncedValue]);

  const getMatchedChildren = async (currentPage = page) => {
    const {
      data: { entries },
    } = await api.get(`/entries/search?q=${debouncedValue}`, {
      params: {
        per: 20,
        page: currentPage,
      },
    });
    setChildren(children.concat(entries));
    if (entries.length === 0) {
      setIsMoreChildren(false);
    }
    return children.concat(entries);
  };

  const fetchData = async () => {
    getMatchedChildren(page + 1);
    setPage(page + 1);
  };

  const onSearchFilledChange = (evt) => {
    setSearchString(evt.currentTarget.value);
    setPage(1);
    setChildren([]);
    if (evt.currentTarget.value.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleResetClick = () => {
    setSearchString("");
    setChildren([]);
    history.push("/");
  };

  return (
    <>
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
            childrenAtLevel={children}
            messageNoChildren="There is no baby with this name"
            messageSeenAllChildren="You have seen all matched children"
            fetchData={fetchData}
            isMoreChildren={isMoreChildren}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default withRouter(CompetitorsSearch);
