import { useRequest } from "ahooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../../api";
import GoBack from "../../images/go-back.svg";
import Loader from "../animation/loader";
import { CompetitorsList } from "../competitors-list";
import { Footer } from "../footer";

const LeaderboardWinners = () => {
  const [winners, setWinners] = useState([]);
  const [isMoreChildren, setIsMoreChildren] = useState(true);
  const [page, setPage] = useState(1);

  const getWinners = async (currentPage = page) => {
    const {
      data: { entries },
    } = await api.get(`/competitions/previous_winners`, {
      params: {
        per: 20,
        page: currentPage,
      },
    });

    setWinners(winners.concat(entries));
    if (entries.length === 0) {
      setIsMoreChildren(false);
    }
    return winners.concat(entries);
  };

  const fetchData = async () => {
    getWinners(page + 1);
    setPage(page + 1);
  };

  const { loading } = useRequest(getWinners, {
    formatResult: (res) => res.data.entries,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="winners">
        <h1 className="headline--small setting__title">Previous winners</h1>
        <Link to="/competition-info" className="go-back">
          <GoBack />
        </Link>
        <CompetitorsList
          childrenAtLevel={winners}
          messageNoChildren="There’s no previous competitions yet"
          messageSeenAllChildren="You have seen all previous winners"
          fetchData={fetchData}
          isMoreChildren={isMoreChildren}
        />
      </div>

      <Footer active="leaderboard" />
    </>
  );
};

export default LeaderboardWinners;
