import React from "react";

const ChildContext = React.createContext({
  currentChild: null,
  setCurrentChild: () => {},
});

export default ChildContext;
