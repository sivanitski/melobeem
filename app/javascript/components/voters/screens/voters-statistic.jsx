import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { api } from "../../../api";
import { formatDateNotification } from "../../../helpers/date";
import IconHeart from "../../../images/icon-heart.svg";
import VoteNotificationItem from "../blocks/vote-notification-item";

const VotersStatistic = ({ id }) => {
  const [totalDays, setTotalDays] = useState([]);
  const [totalVoters, setTotalVoters] = useState([]);
  const getVotesByDate = () => {
    return api.get(`/entries/${id}/total_votes_by_date`);
  };

  const getVoters = (date) => {
    return api.get(`/entries/${id}/voters_by_day`, {
      params: {
        date,
      },
    });
  };

  useEffect(() => {
    async function getData() {
      let allVoters = [];
      const {
        data: { votes: totalVotes },
      } = await getVotesByDate();

      for (let totalVote of totalVotes) {
        const {
          data: { votes: voters },
        } = await getVoters(totalVote.voteDate);
        allVoters = allVoters.concat(voters);
      }
      setTotalVoters(allVoters);
      setTotalDays(totalVotes);
    }

    getData();
  }, []);

  return (
    <>
      <h1 className="headline--small headline--small notification__title">
        Votes
      </h1>
      <div className="notification__list">
        {totalDays &&
          totalDays.map((day) => (
            <React.Fragment key={day.voteDate}>
              <div className="notification__day">
                <div className="notification__date headline" key={day.voteDate}>
                  {formatDateNotification(day.voteDate)}
                </div>
                <div className="notification__like text-pink notification__like--by-day">
                  <IconHeart className="svg-pink" /> {day.totalCount}
                </div>
              </div>
              {totalVoters
                .filter((voter) => voter.voteDate === day.voteDate)
                .map((voterThisDay) => (
                  <VoteNotificationItem
                    notification={voterThisDay}
                    key={`${voterThisDay.userId} + ${voterThisDay.voteDate} + ${voterThisDay.sourceType}`}
                  />
                ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

VotersStatistic.propTypes = {
  id: propTypes.string.isRequired,
};

export default VotersStatistic;
