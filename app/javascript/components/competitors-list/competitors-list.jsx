import "swiper/swiper.less";

import propTypes from "prop-types";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import defaultProptypes from "../../default-proptypes";
import { CompetitorsItem } from "../competitors-item";
import { WinnerItem } from "../winner-item";

const CompetitorsList = ({
  childrenAtLevel,
  messageNoChildren,
  messageSeenAllChildren,
  fetchData,
  isMoreChildren,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {childrenAtLevel.length > 0 ? (
        <div className="competitors__container">
          <InfiniteScroll
            dataLength={childrenAtLevel.length} //This is important field to render the next data
            next={fetchData}
            hasMore={isMoreChildren}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="scroll-message">{messageSeenAllChildren}</p>
            }
          >
            {childrenAtLevel.map((child) =>
              child.name ? (
                <CompetitorsItem competitor={child} key={child.id} />
              ) : (
                <WinnerItem winner={child} key={child.id} />
              )
            )}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="competitors__empty text-grey">{messageNoChildren}</div>
      )}
    </>
  );
};

CompetitorsList.propTypes = {
  childrenAtLevel: propTypes.arrayOf(
    propTypes.oneOfType([
      defaultProptypes.CHILD,
      defaultProptypes.WINNER_OF_COMPETITION,
    ])
  ),
  messageNoChildren: propTypes.string.isRequired,
  fetchData: propTypes.func,
  isMoreChildren: propTypes.bool,
  messageSeenAllChildren: propTypes.string,
};

export default CompetitorsList;
