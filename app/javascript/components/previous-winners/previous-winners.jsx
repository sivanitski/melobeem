import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../api";
import GoBack from "../../images/go-back.svg";
import IconGift from "../../images/icon-gift.svg";
import Loader from "../animation/loader";
import { Footer } from "../footer";

const PreviousWinners = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [isMoreWinners, setIsMoreWinners] = useState(true);
  const [winnerList, setWinnerList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWinners = async (currentPage = page) => {
    const {
      data: { entries },
    } = await api.get(`competitions/${id}/previous_awarded`, {
      params: {
        per: 20,
        page: currentPage,
      },
    });

    setWinnerList(winnerList.concat(entries));

    if (entries.length === 0) {
      setIsMoreWinners(false);
    }

    return winnerList.concat(entries);
  };

  const fetchData = async () => {
    getWinners(page + 1);
    setPage(page + 1);
  };

  const { loading: winnerLoading } = useRequest(getWinners);

  if (winnerLoading) {
    return <Loader />;
  }

  const wonItem = (winner) => {
    let awards = [];
    let prize = `Prize ${winner.competitionMoneyCurrency}${winner.competitionMoneyPrizeConverted}`;
    switch (winner.finalRank) {
      case 1:
        return [prize];
      case 2:
        winner.awards.map((award) => awards.push(wonAward(award)));
        return [prize, awards].flat();
      case 3:
        winner.awards.map((award) => awards.push(wonAward(award)));
        return [prize, awards].flat();
      default:
        winner.awards.map((award) => awards.push(wonAward(award)));
        return awards;
    }
  };

  const wonAward = (award) => {
    switch (award.type) {
      case "spinner":
        return `${award.value} Spins`;
      case "vote":
        return `${award.value} Votes`;
      case "time":
        return `${award.value} minutes`;
    }
  };

  return (
    <>
      <div className="prizes">
        <div className="go-back" onClick={history.goBack}>
          <GoBack />
        </div>
      </div>

      {winnerList.length > 0 ? (
        <div className="winners__container">
          <InfiniteScroll
            dataLength={winnerList.length} //This is important field to render the next data
            next={fetchData}
            hasMore={isMoreWinners}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="scroll-message">
                Yay! You&apos;ve seen all winners!
              </p>
            }
          >
            {winnerList.map((winner) => (
              <div className="competitors-item" key={winner.id}>
                <Link to="/">
                  <div className="competitors__wrapper">
                    <div className="competitors-item__img">
                      <img src={winner.imageUrl} />
                    </div>
                    <div className="competitors-item__names">
                      <div className="competitors-item__child text-black">
                        {winner.name}
                      </div>
                      <div className="competitors-item__parent text-smaller text-grey">
                        {winner.userName}
                      </div>
                    </div>
                    <div className="competitors-item__info">
                      <div className="competitors-item__place text-small text-grey">
                        <IconGift />
                        <div className="text-smaller text-pink">
                          {wonItem(winner).join(",")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="competitors__empty text-grey">
          Yay! You&apos;ve seen all winners!
        </div>
      )}

      <Footer active="levels" />
    </>
  );
};

PreviousWinners.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(PreviousWinners);
