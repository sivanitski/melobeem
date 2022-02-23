import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect } from "react";
import { withRouter } from "react-router";

import { createAPI } from "../../api";
import { EntryChild } from "../entry-child";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import { Loading } from "../loading";

const Entry = ({
  match: {
    params: { id },
  },
}) => {
  const api = createAPI();

  const getChild = () => {
    return api.get(`/entries/${id}`);
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
    throwOnError: true,
  });

  useEffect(() => {
    requestChild();
    requestVoters();
  }, [id]);

  if (childError) {
    return <Error />;
  }
  if (childLoading || votersLoading) {
    return <Loading />;
  }

  return (
    <>
      <HeaderUser child={child} />
      <EntryChild child={child} voters={voters} />
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
