import "../style.less";

import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { api } from "../../../api";

const EntryComment = ({ childId }) => {
  const [entryComments, setEntryComments] = useState([]);
  const [newComment, setNewComments] = useState("");

  useEffect(() => {
    api.get(`/entries/${childId}/comments`).then((res) => {
      setEntryComments(res?.data?.comments);
    });
  }, []);

  const handleComment = () => {
    if (newComment !== "") {
      api
        .get(`/entries/${childId}/create_comment/${newComment}`)
        .then((res) => {
          window.location.reload();
        });
    }
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setNewComments(value);
  };

  return (
    <div className="entry">
      <div>
        <div className="comment_div">
          <input
            minLength="2"
            name="comment"
            value={newComment}
            onChange={handleChange}
            id="comment"
            className="form__input"
            type="text"
          />
          <button
            className={`button comment_btn`}
            type="button"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
        {entryComments == "" ? null : (
          <div className="comments_div">
            <h2 className="heading_comment">Comments</h2>
            <div>
              {entryComments.map((data, index) => {
                return (
                  <div key={index}>
                    <p>{data.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EntryComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default EntryComment;
