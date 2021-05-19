import propTypes from "prop-types";
import React, { useContext, useState } from "react";

import defaultProptypes from "../../../default-proptypes";
import UserContext from "../../../helpers/user-context";
import DotsIcon from "../../../images/dots-settings-icon.svg";
import CertificateIcon from "../../../images/icon-certificate.svg";
import ShareImage from "../../../images/share.svg";
import { FacebookShare } from "../../facebook-share";
import FbComment from "./fb-comments";
import EntryVoters from "./main-voters";
import Parent from "./parent";
import PreviousCompetitionInfo from "./previous-competion-info";
import EntrySetting from "./setting";
import VoteButton from "./vote-button";

const EntryContent = ({ child, voters }) => {
  const { user } = useContext(UserContext);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const toggleSettingOpen = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const renderChildMenu = () => {
    if (user?.id === child.userId) {
      return (
        <>
          <DotsIcon className="entry__setting" onClick={toggleSettingOpen} />

          {isSettingOpen && <EntrySetting childId={child.id} />}
        </>
      );
    }

    return null;
  };

  return (
    <div className="entry">
      <div className="entry__img">
        {renderChildMenu()}

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
        <VoteButton id={child.id} />
      ) : (
        <PreviousCompetitionInfo
          competitionMoneyPrize={child.competitionMoneyPrize}
          totalVotes={child.totalVotes}
          userId={child.userId}
        />
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
