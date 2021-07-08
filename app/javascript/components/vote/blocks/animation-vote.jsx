import propTypes from "prop-types";
import React from "react";
import { useHistory, withRouter } from "react-router";

import defaultProptypes from "../../../default-proptypes";
import VotePrizeAnimation from "../../animation/vote-prize-level";
import { CountAnimation } from "../../count-animation";
import { HeaderUserWithChild } from "../../header-user-with-child";

const AnimationVote = ({
  match: {
    params: { id },
  },
  location: { state },
}) => {
  const history = useHistory();

  if (!state?.animationParams) {
    history.push(`/entry/${id}`);
  }

  return (
    <>
      <HeaderUserWithChild
        child={state.child}
        animationParams={state.animationParams}
        handleAnimationEnd={() => history.push(`/entry/${id}`)}
      />

      <VotePrizeAnimation number={state.value} />

      <div className="vote-animation__text headline--medium">
        <div className="vote-animation__title text-pink">
          <CountAnimation numberStart={state.value} numberEnd={0} isDecrease />
        </div>
        <div className="vote-animation__subtitle text-grey">votes</div>
      </div>
    </>
  );
};

AnimationVote.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
  location: propTypes.shape({
    state: propTypes.shape({
      child: defaultProptypes.CHILD,
      animationParams: propTypes.shape({
        isAnimationPlay: propTypes.bool,
        votesStart: propTypes.number,
        votesEnd: propTypes.number,
        rankStart: propTypes.number,
        rankEnd: propTypes.number,
        level: propTypes.number,
      }),
      value: propTypes.number,
    }),
  }),
};

export default withRouter(AnimationVote);
