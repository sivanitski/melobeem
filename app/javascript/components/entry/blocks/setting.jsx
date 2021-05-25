import propTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router";

import DotsIcon from "../../../images/dots-settings-icon.svg";
import SettingDeleteIcon from "../../../images/entry-delete-icon.svg";
import SettingShareIcon from "../../../images/entry-share-icon.svg";
import { FacebookShare } from "../../facebook-share";

const EntrySetting = ({ childId, isSettingOpen, toggleSettingOpen }) => {
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    setDeleting(true);
  };

  if (deleting) {
    history.push("/delete", { id: childId, type: "child" });
  }

  return (
    <>
      <DotsIcon className="entry__setting" onClick={toggleSettingOpen} />

      {isSettingOpen && (
        <div className="entry-setting__list">
          <div className="entry-setting__item">
            Share
            <FacebookShare childId={childId} classes="entry-setting__img">
              <SettingShareIcon />
            </FacebookShare>
          </div>
          <div className="entry-setting__item text-red" onClick={handleDelete}>
            Delete entry <SettingDeleteIcon className="entry-setting__img" />
          </div>
        </div>
      )}
    </>
  );
};

EntrySetting.propTypes = {
  childId: propTypes.number.isRequired,
  isSettingOpen: propTypes.bool.isRequired,
  toggleSettingOpen: propTypes.func.isRequired,
};

export default EntrySetting;
