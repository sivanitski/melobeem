import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";

import { api } from "../../../api";
import defaultProptypes from "../../../default-proptypes";
import ChildContext from "../../../helpers/child-context";
import UserContext from "../../../helpers/user-context";
import CertificateIcon from "../../../images/icon-certificate.svg";
import ShareImage from "../../../images/share.svg";
import { FacebookShare } from "../../facebook-share";
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

  useEffect(() => {
    if (currentChild?.id === child.id) {
      api.get(`/entries/${currentChild.id}/prize_time`).then((res) => {
        setPrizeTime(res?.data?.value);
      });
    }
  }, []);

  const getFreeVoteTimer = () => {
    return api.get(`/entries/${child.id}/votes/expiration_time_for_free`);
  };

  const { data: timeFreeVote, loading } = useRequest(getFreeVoteTimer, {
    formatResult: (res) => res.data.ttlInSeconds,
  });

  const toggleSettingOpen = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const isUsersChild = child.userId === user?.id;

  return (
    <div className="entry">
      <div className="entry__img">
        {isUsersChild && (
          <EntrySetting
            childId={child.id}
            isSettingOpen={isSettingOpen}
            toggleSettingOpen={toggleSettingOpen}
          />
        )}

        <img src={child.imageUrl} />

        {child.currentCompetition ? (
          <FacebookShare childId={child.id} classes="entry__share">
            <ShareImage />
          </FacebookShare>
        ) : (
          <div className="entry__share">
            <CertificateIcon />
          </div>
        )}
      </div>
      <div className="entry__name headline--medium">{child.name}</div>

      {child.currentCompetition ? (
        <>
          {prizeTime && <TimeMessage value={prizeTime} />}

          {loading ? null : (
            <Timer
              id={child.id}
              type="entry"
              timeLeftInSeconds={timeFreeVote}
            />
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
    </div>
  );
};

EntryContent.propTypes = {
  child: defaultProptypes.CHILD,
  voters: propTypes.arrayOf(defaultProptypes.VOTER),
};

export default EntryContent;
