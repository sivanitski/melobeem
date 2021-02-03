import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React from "react";
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

  const getCurrentCompetitor = () => {
    return api.get(`/competitions/1/children/${id}`);
  };

  const { data, error, loading } = useRequest(getCurrentCompetitor, {
    formatResult: (res) => res.data,
  });

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <HeaderUser />
      <EntryChild child={data} />
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
