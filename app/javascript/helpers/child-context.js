import React from "react";

const ChildContext = React.createContext({
  currentChild: null,
  setCurrentChild: () => {},
  updateCurrentChildVotes: () => {},
});

export default ChildContext;
