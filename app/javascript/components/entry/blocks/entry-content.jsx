import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { api } from "../../../api";
import defaultProptypes from "../../../default-proptypes";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import AwardSecret from "../../../images/award-secret.svg";
import AwardSpinner from "../../../images/award-spinner.svg";
import AwardTimer from "../../../images/award-timer.svg";
import AwardVote from "../../../images/award-vote.svg";
import CertificateIcon from "../../../images/icon-certificate.svg";
import ShareImage from "../../../images/share.svg";
import { FacebookShare } from "../../facebook-share";
import { Popup } from "../../popup";
import { Timer } from "../../timer";
import CompetitionPrize from "./competition-prize";
import FbComment from "./fb-comments";
import EntryVoters from "./main-voters";
import Parent from "./parent";
import PreviousCompetitionInfo from "./previous-competion-info";
import EntrySetting from "./setting";
import TimeMessage from "./time-fast-message";

const EntryContent = ({ child, voters }) => {
  const { user } = useContext(UserContext);
  const [prizeTime, setPrizeTime] = useState(null);
  const { currentChild } = useContext(ChildContext);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (currentChild?.id === child.id) {
      api.get(`/entries/${currentChild.id}/prize_time`).then((res) => {
        setPrizeTime(res?.data?.value);
      });
    }
  }, []);

  function handleAwardClick(awardId) {
    history.push(`/awards/${awardId}`);
  }

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${child.id}/votes/expiration_time_for_free`);
  };

  const { data: timeFreeVote, loading } = useRequest(getFreeVoteTimer, {
    formatResult: (res) => res.data.ttlInSeconds,
  });

  const getAwards = () => {
    return api.get(`/awards?all=true`);
  };

  const awardsResponse = useRequest(getAwards, {
    formatResult: (res) => res.data.awards,
  });

  const toggleSettingOpen = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleVotersClick = () => {
    if (!user) {
      setIsPopupShown(true);
    } else {
      history.push(`/entry/${child.id}/vote`);
    }
  };

  const isUsersChild = child.userId === user?.id;

  const awardImagePath = {
    spinner: <AwardSpinner />,
    vote: <AwardVote />,
    time: <AwardTimer />,
  };

  return (
    <div className="entry">
      <Helmet>
        <meta
          name="title"
          content={`Competition Melobeem -- ${child.name}`}
          data-react-helmet="true"
        />
        <meta
          name="description"
          content={`Vote for ${child.name} to make him closer to victory`}
          data-react-helmet="true"
        />
      </Helmet>
      <div className="entry__img">
        {isUsersChild && (
          <EntrySetting
            childId={child.id}
            isCurrenCompetition={child.currentCompetition}
            isSettingOpen={isSettingOpen}
            toggleSettingOpen={toggleSettingOpen}
          />
        )}

        <img src={child.imageUrl} />

        {child.currentCompetition ? (
          <FacebookShare
            childId={child.id}
            classes="entry__share entry_ready_share"
          >
            <ShareImage />
          </FacebookShare>
        ) : (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="entry__share"
            to={`/api/v1/entries/${child.id}/certificate`}
          >
            <CertificateIcon />
          </Link>
        )}
      </div>
      <div className="entry__name headline--medium">{child.name}</div>

      {child.currentCompetition ? (
        <>
          {prizeTime && <TimeMessage value={prizeTime} />}

          {loading || (awardsResponse && awardsResponse.loading) ? null : (
            <>
              {isUsersChild && awardsResponse.data.length > 0 && (
                <div className="entry-competition-awards">
                  <div className="entry-competition-awards-container">
                    {awardsResponse.data.map((award) => (
                      <div
                        className="entry-award-block__img"
                        key={award.id}
                        onClick={() => handleAwardClick(award.id)}
                      >
                        {award.isSecret ? (
                          <AwardSecret />
                        ) : (
                          awardImagePath[award.awardType]
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Timer
                type="entry"
                timeLeftInSeconds={timeFreeVote}
                handleFieldClick={handleVotersClick}
              />
            </>
          )}
        </>
      ) : (
        <>
          <PreviousCompetitionInfo
            competitionMoneyPrize={child.competitionMoneyPrize}
            totalVotes={child.totalVotes}
          />
          {isUsersChild && (
            <CompetitionPrize
              moneyPrize={child.competitionMoneyPrize}
              spinPrize={child.competitionAdditionalPrize}
              isSpinPrizeSpent={child.spentCompetitionAdditionalPrize}
              childId={child.id}
            />
          )}
        </>
      )}

      {voters && <EntryVoters childId={child.id} voters={voters} />}

      <Parent
        userId={child.userId}
        avatarUrl={child.avatarUrl}
        username={child.username}
      />

      <FbComment childId={child.id} />

      {isPopupShown && (
        <Popup
          handlePopupClose={() => setIsPopupShown(false)}
          image={child.imageUrl}
          type="login-to-vote"
          linkId={child.id}
        />
      )}
    </div>
  );
};

EntryContent.propTypes = {
  child: defaultProptypes.CHILD,
  voters: propTypes.arrayOf(defaultProptypes.VOTER),
};

export default EntryContent;
