import "swiper/swiper.less";
import "./style.less";

import { useRequest } from "ahooks";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../../api";
import ChildContext from "../../helpers/child-context";
import InfoIcon from "../../images/info-sign.svg";
import SearchIcon from "../../images/search-icon.svg";
import { CompetitorsList } from "../competitors-list";
import { CompetitorsSwiperMenu } from "../competitors-swiper-menu";
import CompetitorsLoading from "../loaders/competitors-loading";

const Competitors = ({}) => {
  const { currentChild } = useContext(ChildContext);
  const [children, setChildren] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [isMoreChildren, setIsMoreChildren] = useState(true);
  const [level, setLevel] = useState(
    currentChild?.level ? currentChild.level : 1
  );

  const getEntries = async (
    currentPage = page,
    currentLevel = level,
    isChangeLevel
  ) => {
    const {
      data: { entries },
    } = await api.get("/entries", {
      params: {
        per: 20,
        page: currentPage,
        level: currentLevel,
      },
    });
    if (isChangeLevel) {
      setChildren(entries);
    } else {
      setChildren(children.concat(entries));
    }
    if (entries.length === 0) {
      setIsMoreChildren(false);
    }
    setPageLoading(false);
    return children.concat(entries);
  };

  const { loading: childrenLoading } = useRequest(getEntries);

  const getMaxLevel = () => {
    return api.get("/entries/max_level_entry");
  };

  const { data: maxLevel, loading } = useRequest(getMaxLevel, {
    formatResult: (res) => res.data,
  });

  const onSliderClick = (index) => {
    setPageLoading(true);
    setLevel(index);
    setPage(1);
    getEntries(1, index, true);
  };

  const fetchData = async () => {
    getEntries(page + 1);
    setPage(page + 1);
  };

  return (
    <div className="competitors">
      <div className="competitors__title headline--medium">
        Leaderboard
        <div className="leaderboard-icons">
          <Link
            to="/competition-info"
            className="leaderboard-icons__item leaderboard-icons__item--info"
          >
            <InfoIcon />
          </Link>
          <Link
            to="/search"
            className="leaderboard-icons__item leaderboard-icons__item--search"
          >
            <SearchIcon />
          </Link>
        </div>
      </div>
      <CompetitorsSwiperMenu
        onSliderClick={onSliderClick}
        maxLevel={maxLevel}
        minLevel={level}
      />

      {loading || childrenLoading || pageLoading ? (
        <CompetitorsLoading />
      ) : (
        <CompetitorsList
          childrenAtLevel={children}
          fetchData={fetchData}
          isMoreChildren={isMoreChildren}
          messageNoChildren="There’s no one on this level right now."
          pageLoading={pageLoading}
          messageSeenAllChildren="Yay! You've seen all children on this level!"
        />
      )}
    </div>
  );
};

export default Competitors;
