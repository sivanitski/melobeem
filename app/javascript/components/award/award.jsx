import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import AwardDecorSecret from "../../images/award-secret-decor.svg";
import AwardDecorSpinner from "../../images/award-spinner-decor.svg";
import AwardDecorTimer from "../../images/award-timer-decor.svg";
import AwardDecorVote from "../../images/award-vote-decor.svg";
import GoBack from "../../images/go-back.svg";
import Loader from "../animation/loader";
import SecretPrizeTimeAnimation from "../animation/secret-prize-time-animation";
import { Error } from "../error";
import { Footer } from "../footer";

const Award = ({
  match: {
    params: { id },
  },
}) => {
  const [isSecretOpened, setIsSecretOpened] = useState(false);
  const history = useHistory();

  const getAward = () => {
    return api
      .get(`/awards/${id}`)
      .then((response) => {
        return response;
      })
      .catch(() => {
        history.push("/");
      });
  };

  const { data: award, error, loading } = useRequest(getAward, {
    formatResult: (res) => res.data.award,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loader />;
  }

  const awardDecorPath = {
    spinner: <AwardDecorSpinner />,
    vote: <AwardDecorVote />,
    time: <AwardDecorTimer />,
  };

  const awardDecorTitle = () => {
    if (award.isSecret) {
      return "Secret prize";
    } else {
      switch (award.awardType) {
        case "spinner":
          return `${award.value} Spins`;
        case "vote":
          return `${award.value} Votes`;
        case "time":
          return `Time ${award.value} min`;
      }
    }
  };

  const awardDecorTitleStyle = () => {
    if (award.isSecret) {
      return "award-text-pink";
    } else {
      switch (award.awardType) {
        case "spinner":
          return "award-text-orange";
        case "vote":
          return "award-text-pink";
        case "time":
          return "award-text-green";
      }
    }
  };

  const awardDecorDescription = () => {
    if (award.isSecret) {
      return "Thank you for staying with us";
    } else {
      switch (award.awardType) {
        case "spinner":
          return "Claim your prize from previous competition. Good luck!";
        case "vote":
          return `You got ${value} Votes as a prize from previous competition`;
        case "time":
          return `You and your friends can Vote every ${award.value} min for 24 hours`;
      }
    }
  };

  const awardDecorButtonStyle = () => {
    if (award.isSecret) {
      return "award-text-pink-bg";
    } else {
      switch (award.awardType) {
        case "spinner":
          return "award-text-orange-bg";
        case "vote":
          return "award-text-pink-bg";
        case "time":
          return "award-text-green-bg";
      }
    }
  };

  const awardSecretDescription = () => {
    switch (award.awardType) {
      case "spinner":
        return "award-text-orange-bg";
      case "vote":
        return "award-text-pink-bg";
      case "time":
        return (
          "Your secret prize is Timer. You and your frinds can \n" +
          "Vote every 10 min\n" +
          "for 24 hours"
        );
    }
  };

  const handleTakePrize = async () => {
    const res = await api.post(`awards/${id}/take_prize`);

    if (res) {
      if (res.data.awardType === "spinner") {
        history.push(`/spinner`);
      } else {
        history.push(`/entry/${res.data.entryId}`);
      }
    }
  };

  const handleSecretPrize = () => {
    setIsSecretOpened(true);
  };

  return (
    <>
      <div className="prizes">
        <div className="go-back" onClick={history.goBack}>
          <GoBack />
        </div>
      </div>

      {isSecretOpened ? (
        <div className="award-container-without-margin">
          <div className="award-decor__img-animation">
            <SecretPrizeTimeAnimation />
          </div>
          <div className="award-decor__title">
            <p className="award-decor__title-style award-text-pink">
              Congratulations!
            </p>
          </div>
          <div className="award-decor__description-container">
            <p className="award-decor__description">
              {awardSecretDescription()}
            </p>
          </div>

          <div
            onClick={handleTakePrize}
            className={`award-button ${awardDecorButtonStyle()}`}
          >
            Take prize
          </div>
        </div>
      ) : (
        <div className="award-container">
          <div className="award-decor__img">
            {award.isSecret ? (
              <AwardDecorSecret />
            ) : (
              awardDecorPath[award.awardType]
            )}
          </div>
          <div className="award-decor__title">
            <p className={`award-decor__title-style ${awardDecorTitleStyle()}`}>
              {awardDecorTitle()}
            </p>
          </div>
          <div className="award-decor__description-container">
            <p className="award-decor__description">
              {awardDecorDescription()}
            </p>
          </div>

          {award.isSecret ? (
            <div
              className={`award-button ${awardDecorButtonStyle()}`}
              onClick={handleSecretPrize}
            >
              See your secret prize
            </div>
          ) : (
            <div
              onClick={handleTakePrize}
              className={`award-button ${awardDecorButtonStyle()}`}
            >
              Take prize
            </div>
          )}
        </div>
      )}

      <Footer active="levels" />
    </>
  );
};

Award.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Award);
