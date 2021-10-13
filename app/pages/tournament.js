import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import {
  convertDataFromDB,
  getTeams,
} from '../firebase/firestore/firestoreActions';
import { CustomModal } from '../components/helpers/CustomModal';

const Tournament = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Get users from DB
  useEffect(() => {
    convertDataFromDB(getTeams).then(data => setTeams(data));
  }, []);

  console.log('teams: ', teams);

  return (
    <>
      <CustomModal
        className="pilkarzyki__modal"
        enableClickAway
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <p>siemanko</p>
      </CustomModal>
      <Page>
        <p>to je tournament</p>
        <button onClick={() => setIsModalOpen(true)}>Otwieraj</button>
      </Page>
    </>
  );
};

export default Tournament;
