import propTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router";

import SettingDeleteIcon from "../../../images/entry-delete-icon.svg";
import SettingShareIcon from "../../../images/entry-share-icon.svg";
import { FacebookShare } from "../../facebook-share";

const EntrySetting = ({ childId }) => {
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    setDeleting(true);
  };

  if (deleting) {
    history.push("/delete", { id: childId, type: "child" });
  }

  return (
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
  );
};

EntrySetting.propTypes = {
  childId: propTypes.number.isRequired,
};

export default EntrySetting;
