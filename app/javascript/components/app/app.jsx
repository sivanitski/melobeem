import React from "react";
import propTypes from 'prop-types';
import {Leaderboard} from '../leaderboard';


const App = ({competitors}) => {
  return (
    <Leaderboard competitors={competitors}/>
  );
};

App.propTypes = {
  competitors: propTypes.arrayOf(propTypes.shape({
    ID: propTypes.number.isRequired,
    NAME: propTypes.string.isRequired,
    PHOTO: propTypes.string.isRequired})).isRequired,
};

export default App;
