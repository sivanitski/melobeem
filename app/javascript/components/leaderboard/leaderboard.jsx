import React, {useState, useEffect} from 'react';
import {useRequest} from 'ahooks';
import {HeaderNotLogin} from '../header-not-login';
import {NewIn} from '../new-in';
import {createAPI} from '../../api';

const Leaderboard = () => {
  const api = createAPI();

  const getCompetitors = () => {
    return api.get(`/competitors`);
  }

  const {data, error, loading} = useRequest(getCompetitors);

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HeaderNotLogin/>
      <NewIn competitors={data.data}/>
    </>
  );
  
}

export default Leaderboard;
