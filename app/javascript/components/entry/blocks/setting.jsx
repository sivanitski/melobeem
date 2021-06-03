import propTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router";

import DotsIcon from "../../../images/dots-settings-icon.svg";
import SettingDeleteIcon from "../../../images/entry-delete-icon.svg";
import SettingEditIcon from "../../../images/entry-edit-icon.svg";

const EntrySetting = ({
  childId,
  isSettingOpen,
  toggleSettingOpen,
  isCurrenCompetition,
}) => {
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    setDeleting(true);
  };

  if (deleting) {
    history.push("/delete", { id: childId, type: "child" });
  }

  const handleEdit = () => {
    history.push(`/entry/${childId}/edit`);
  };

  return (
    <>
      <DotsIcon className="entry__setting" onClick={toggleSettingOpen} />

      {isSettingOpen && (
        <div className="entry-setting__list">
          {isCurrenCompetition && (
            <div className="entry-setting__item" onClick={handleEdit}>
              Edit <SettingEditIcon className="entry-setting__img" />
            </div>
          )}

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
  isCurrenCompetition: propTypes.bool.isRequired,
};

export default EntrySetting;
