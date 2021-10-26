import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import EntryShowLoader from "../loaders/entry/entry-show-loader";
import EntryContent from "./blocks/entry-content";

const Entry = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();

  const getChild = () => {
    return api
      .get(`/entries/${id}`)
      .then((response) => {
        return response;
      })
      .catch(() => {
        history.push("/");
      });
  };

  const {
    data: child,
    error: childError,
    loading: childLoading,
    run: requestChild,
  } = useRequest(getChild, {
    formatResult: (res) => res.data.entry,
  });

  const getMainVoters = () => {
    return api.get(`/entries/${id}/latest_voters`);
  };

  const {
    data: voters,
    loading: votersLoading,
    run: requestVoters,
  } = useRequest(getMainVoters, {
    formatResult: (res) => res.data.users,
  });

  useEffect(() => {
    requestChild();
    requestVoters();
  }, [id]);

  if (childError) {
    return <Error />;
  }
  if (childLoading || votersLoading) {
    return <EntryShowLoader />;
  }

  return (
    <>
      <HeaderUser child={child} />
      <EntryContent child={child} voters={voters} />
      <Footer />
    </>
  );
};

Entry.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Entry);
