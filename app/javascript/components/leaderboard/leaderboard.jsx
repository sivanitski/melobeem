import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {HeaderNotLogin} from '../header-not-login';
import {NewIn} from '../new-in';

const Leaderboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    axios.get(`https://6001809808587400174dac79.mockapi.io/melobeem/competitors`)
    .then(res => {
      setCompetitors(res.data);
      setIsLoaded(true);
    })
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HeaderNotLogin/>
      <NewIn competitors={competitors}/>
    </>
  );
  
}

export default Leaderboard;
