import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import propTypes from "prop-types";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { api } from "../../../api";
import UserContext from "../../../helpers/user-context";
import DeleteIcon from "../../../images/delete.svg";
import EllipsesIcon from "../../../images/ellipses.svg";
import ReplyIcon from "../../../images/reply-icon.svg";
import ReportIcon from "../../../images/report.svg";
import Modal from "./Modal";
import Pagination from "./Pagination";

dayjs.extend(relativeTime);

const FbComment = ({ childId }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [replyComment, setReplyComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [show, setShow] = useState(false);
  const [alarm, setAlarm] = useState("");
  const [loadMoreData, setLoadMoreData] = useState([]);
  const pageSize = 10;

  useMemo(() => {
    async function getComments() {
      const { data: comments } = await api.get(
        `/entries/${childId}/comments?` +
          `page=` +
          currentPage +
          `&per=` +
          pageSize
      );
      setComments(comments.comments);
      setTotalCount(comments.meta.totalCount);
    }
    getComments();
    setLoadMoreData([]);
  }, [currentPage]);

  useEffect(() => {
    setIsPost(comment !== "");
  }, [comment]);

  const handleInput = (value) => {
    setComment(value);
    setCommentId(null);
    setParentId(null);
  };

  const handleReply = (id) => {
    if (id === commentId) {
      setCommentId(null);
      setParentId(null);
    } else if (id !== commentId) {
      setCommentId(id);
      comments.forEach((comment) => {
        if (comment.id === id) {
          setParentId(comment.id);
        } else {
          if (comment.replies != null) {
            comment.replies.forEach((subcomment) => {
              if (subcomment.id === id) {
                setParentId(subcomment.parentId);
              }
            });
          }
        }
      });
    }
    setReplyComment("");
  };

  const handlePost = (value = comment) => {
    api
      .post(`/entries/${childId}/comments`, {
        comment: {
          body: value,
          user_id: user.id,
          parent_id: parentId,
        },
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setAlarm(error.response.data.message.replace("Body", "Comment"));
        setShow(true);
      })
      .then((res) => {
        if (res) {
          async function getComments() {
            const { data: comments } = await api.get(
              `/entries/${childId}/comments`
            );
            setComments(comments.comments);
          }
          getComments();
          setComment("");
          setCommentId(null);
        }
      });
  };

  const handleDelete = (id) => {
    api.delete(`/entries/${childId}/comments/${id}`).then((res) => {
      if (res.status === 200) {
        async function getComments() {
          const { data: comments } = await api.get(
            `/entries/${childId}/comments`
          );
          setComments(comments.comments);
        }
        getComments();
      }
    });
  };

  const handleReport = (id) => {
    api
      .post(`/entries/${childId}/comments/${id}/report_comment`)
      .then((res) => {
        if (res.status === 200) {
          async function getComments() {
            const { data: comments } = await api.get(
              `/entries/${childId}/comments`
            );
            setComments(comments.comments);
          }
          getComments();
        }
      });
  };

  const getSubComments = async (id, page, count) => {
    const { data: subcomments } = await api.get(
      `/entries/${childId}/comments/${id}/load_child_comments?` +
        `page=` +
        page +
        `&per=` +
        count
    );
    let tempData = [...comments];
    tempData.forEach((data) => {
      if (data.id === id) {
        data.replies = data.replies.concat(subcomments.comments);
      }
    });
    setComments(tempData);
    let temp = [...loadMoreData];
    temp[id] = {
      total: subcomments.meta.totalCount,
      page: page,
    };
    setLoadMoreData(temp);
  };

  const handleLoadMore = async (id) => {
    let count = 2;
    if (loadMoreData.length == 0) {
      getSubComments(id, 2, count);
    } else {
      if (loadMoreData[id] !== undefined) {
        getSubComments(id, loadMoreData[id].page + 1, count);
      } else {
        getSubComments(id, 2, count);
      }
    }
  };

  const InputSection = (
    <div className="input_section">
      <img src={user?.avatarUrl} alt={user?.name} className="image_comments" />
      <input
        type="text"
        className="input_comments"
        placeholder="Add your comment"
        onChange={(e) => handleInput(e.target.value)}
        value={comment}
      />
      <button
        className={`button_comment ${isPost ? "post_active" : ""}`}
        onClick={() => handlePost()}
      >
        Post
      </button>
    </div>
  );

  const ReplySection = ({ id }) => {
    const [value, setValue] = useState(replyComment);
    const [isReply, setIsReply] = useState(false);
    useEffect(() => {
      setIsReply(value !== "");
    }, [value]);
    return (
      <div className="input_section reply_section">
        <img
          src={user?.avatarUrl}
          alt={user?.name}
          className="image_comments"
        />
        <input
          type="text"
          className="input_comments"
          id={`type-${id}`}
          placeholder="Write a reply..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className={`button_comment ${isReply ? "post_active" : ""}`}
          onClick={() => handlePost(value)}
        >
          Post
        </button>
      </div>
    );
  };

  const EllipsesMenu = ({ user, comment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuEvent = (id, type) => {
      setIsOpen(!isOpen);
      if (type === "report") {
        handleReport(id);
      } else {
        handleDelete(id);
      }
    };
    return (
      <div className="ellipses_menu">
        <input
          className="ellipses_dropdown"
          type="checkbox"
          id={`ellipses_dropdown_${comment.id}`}
          name={`ellipses_dropdown_${comment.id}`}
        />
        <label
          className="for-ellipses_dropdown"
          htmlFor={`ellipses_dropdown_${comment.id}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <EllipsesIcon />
        </label>
        <div className={`section-dropdown ${isOpen ? "menu_active" : ""}`}>
          {user.id !== comment.userId ? (
            <div
              className="menu-item"
              onClick={() => handleMenuEvent(comment.id, "report")}
            >
              <span className="report_menu">Report</span>
              <ReportIcon />
            </div>
          ) : (
            <div
              className="menu-item"
              onClick={() => handleMenuEvent(comment.id, "delete")}
            >
              <span className="delete_menu">Delete comment</span>
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
    );
  };

  const CommentsSection = ({ comment, handleLoadMore, loadMoreData }) => {
    return (
      <>
        <div className="comments_section">
          <img
            src={comment?.userAvatar}
            alt={comment?.userName}
            className="image_comments"
          />
          <div className="comments_info">
            <span className="comments_user_name"> {comment.userName} </span>
            <span className="comments_content"> {comment.body} </span>
          </div>
          {user ? (
            <>
              <EllipsesMenu comment={comment} user={user} />
              <button
                className="reply_button"
                data-toggle="input_section"
                onClick={() => handleReply(comment.id)}
              >
                <ReplyIcon />
              </button>
            </>
          ) : (
            <></>
          )}
          <span className="comment_date">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
        {commentId === comment.id && <ReplySection id={comment.id} />}
        {comment.replies &&
          comment.replies.map((subcomment, index) => (
            <div
              className="sub_comment"
              style={{ width: "calc(100% - 56px)" }}
              key={`index-${index}`}
            >
              <CommentsSection
                comment={subcomment}
                handleLoadMore={handleLoadMore}
                loadMoreData={loadMoreData}
              />
            </div>
          ))}
        {comment.replies && comment.replies.length >= 2 && (
          <button
            className={`load_more ${
              loadMoreData[comment.id] !== undefined &&
              loadMoreData[comment.id].total < loadMoreData[comment.id].page * 2
                ? "d-none"
                : ""
            }`}
            onClick={() => handleLoadMore(comment.id)}
          >
            load more
          </button>
        )}
      </>
    );
  };

  return (
    <div className="custom__comments">
      {user ? InputSection : <></>}
      <div className="comments_setion">
        {comments &&
          comments.map((comment, i) => (
            <CommentsSection
              key={i}
              comment={comment}
              handleLoadMore={handleLoadMore}
              loadMoreData={loadMoreData}
            />
          ))}
      </div>
      <Pagination
        classname="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <Modal show={show} onClose={() => setShow(false)}>
        <div className="alarm_content">{alarm}</div>
      </Modal>
    </div>
  );

  CommentsSection.propTypes = {
    comment: propTypes.object.isRequired,
    handleLoadMore: propTypes.func,
    loadMoreData: propTypes.object,
  };

  EllipsesMenu.propTypes = {
    comment: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
  };

  ReplySection.propTypes = {
    id: propTypes.number.isRequired,
  };
};

FbComment.propTypes = {
  childId: propTypes.number.isRequired,
};

export default FbComment;
