import "./style.less";

import { useRequest } from "ahooks";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";

import { api } from "../../api";
import { Error } from "../error";
import { Footer } from "../footer";
import { HeaderUser } from "../header-user";
import EntryShowLoader from "../loaders/entry/entry-show-loader";
import Popup from "../popup/popup";
import EntryContent from "./blocks/entry-content";

const Entry = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const [isPopupShown, setIsPopupShown] = useState(false);

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

  const getEventData = () => {
    return api.get(`/events/show_event_modal`);
  };

  const {
    data: saleEvent,
    loading: saleEventLoading,
    run: requestEventModal,
  } = useRequest(getEventData, {
    formatResult: (res) => res.data.event,
  });

  const getMainVoters = () => {
    return api.get(`/entries/${id}/latest_voters`);
  };

  const handlePopupClose = () => {
    setIsPopupShown(false);
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
    requestEventModal();
  }, [id]);

  useEffect(() => {
    if (saleEvent && saleEvent.id) {
      setIsPopupShown(true);
    }
  }, [saleEvent]);

  if (childError) {
    return <Error />;
  }
  if (childLoading || votersLoading || saleEventLoading) {
    return <EntryShowLoader />;
  }

  return (
    <>
      <HeaderUser child={child} />
      <EntryContent child={child} voters={voters} />
      <Footer />

      {isPopupShown && (
        <Popup
          handlePopupClose={handlePopupClose}
          linkId={child.id}
          type={`${saleEvent.eventType}_sale`}
        />
      )}
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
