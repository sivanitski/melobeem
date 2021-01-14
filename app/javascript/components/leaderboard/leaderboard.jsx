import React from 'react';
import {HeaderNotLogin} from '../header-not-login';
import {NewIn} from '../new-in';

const Leaderboard = ({competitors}) => {
  return (
    <>
      <HeaderNotLogin/>
      <NewIn competitors={competitors}/>
    </>
  );
  
}

export default Leaderboard;
