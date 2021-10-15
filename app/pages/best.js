import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Page from '../components/Page';
import {
  convertDataFromDB,
  getBests,
} from '../firebase/firestore/firestoreActions';
import Loader from '../static/images/loading.png';

const Best = () => {
  const [bests, setBests] = useState([]);

  const sortedBests = bests.sort((a, b) => b.tournamentsWon - a.tournamentsWon);

  useEffect(() => {
    convertDataFromDB(getBests).then(data => setBests(data));
  }, []);

  return (
    <Page classes="pilkarzyki__bests">
      <p className="pilkarzyki__bests-title">Hall of fame</p>
      {bests.length ? (
        <table>
          <tr className="pilkarzyki__bests-row">
            <td className="pilkarzyki__bests-best">Nazwa drużyny</td>
            <td className="pilkarzyki__bests-best">Wygrano turniejów</td>
            <td className="pilkarzyki__bests-best">
              Liczba strzelonych bramek
            </td>
          </tr>
          {sortedBests.slice(0, 10).map(best => (
            <tr className="pilkarzyki__bests-row" key={best.name}>
              <td className="pilkarzyki__bests-best">{best.name}</td>
              <td className="pilkarzyki__bests-best">{best.tournamentsWon}</td>
              <td className="pilkarzyki__bests-best">{best.totalPoints}</td>
            </tr>
          ))}
        </table>
      ) : (
        <Image height={500} placeholder="blur" src={Loader} width={500} />
      )}
    </Page>
  );
};

export default Best;
