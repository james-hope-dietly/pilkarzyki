import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import {
  convertDataFromDB,
  getTeams,
} from '../firebase/firestore/firestoreActions';

const Tournament = () => {
  const [teams, setTeams] = useState([]);

  //Get users from DB
  useEffect(() => {
    convertDataFromDB(getTeams).then(data => setTeams(data));
  }, []);

  return (
    <Page>
      <p>to je tournament</p>
      <p>{teams}</p>
    </Page>
  );
};

export default Tournament;
