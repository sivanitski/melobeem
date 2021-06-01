import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { withRouter } from "react-router";

import { api } from "../../../api";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import HeartVote from "../../../images/heart-vote.svg";
import Loader from "../../animation/loader";
import TimeMessage from "../../entry/blocks/time-fast-message";
import { InfoBlock } from "../../info-block";
import { Timer } from "../../timer";
import TimeMenu from "./time-menu";

const TIME_TITLE_INFO = "What is Time prize?";
const TIME_TEXT_INFO =
  "Free votes on this entry can now happen more frequently. Instead of 40 minutes it’s now every 30 minutes! (lasts 24h)";

const VoteList = ({ childId, timeFreeVote, handlePriceClick, updateData }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState(null);
  const { user } = useContext(UserContext);
  const { currentChild } = useContext(ChildContext);
  const [prizeTime, setPrizeTime] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    async function loadToken() {
      const recaptchaToken = await executeRecaptcha("create_free");

      setToken(recaptchaToken);
    }

    if (currentChild?.id === childId) {
      api.get(`/entries/${childId}/prize_time`).then((res) => {
        setPrizeTime(res?.data);
      });
    }

    if (!user?.captchaVerified) {
      loadToken();
    }
  }, []);

  const getVoteOptions = () => {
    return api.get("/products", { params: { product_type: "vote" } });
  };

  const { data: voteOptions, loading } = useRequest(getVoteOptions, {
    formatResult: (res) => res.data.products,
  });

  const handleFreeVoteClick = async () => {
    await api.post(`/entries/${childId}/votes/create_free`, {
      entryId: childId,
      value: 1,
      userId: user.id,
      "g-recaptcha-response-data": token,
    });
    updateData();
  };

  const handlePaidClick = (clickedVoteOption) => {
    handlePriceClick(clickedVoteOption);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="vote">
      {prizeTime && (
        <>
          <TimeMenu
            time={prizeTime.message}
            value={prizeTime.value}
            handleInfoOpen={() => setIsInfoOpen(true)}
          />
          <TimeMessage value={prizeTime.value} />
        </>
      )}

      {isInfoOpen ? (
        <InfoBlock
          title={TIME_TITLE_INFO}
          text={TIME_TEXT_INFO}
          handleInfoClose={() => setIsInfoOpen(false)}
        />
      ) : (
        <div className="vote-item">
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--free" />
          </div>

          <div className="vote-item__text">1 Vote</div>
          <Timer
            timeLeftInSeconds={timeFreeVote}
            handleFieldClick={handleFreeVoteClick}
            type="votes"
          />
        </div>
      )}

      {voteOptions.map((voteOption) => (
        <div className="vote-item" key={voteOption.value}>
          <div className="vote-item__img">
            <HeartVote className="vote-item__img--small" />
          </div>
          <div className="vote-item__text">{voteOption.title}</div>
          <div
            className="vote-item__button"
            onClick={() => handlePaidClick(voteOption)}
          >
            {voteOption.price}
          </div>
        </div>
      ))}
    </div>
  );
};

VoteList.propTypes = {
  timeFreeVote: propTypes.number.isRequired,
  childId: propTypes.number.isRequired,
  handlePriceClick: propTypes.func.isRequired,
  updateData: propTypes.func.isRequired,
};

export default withRouter(VoteList);