import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Loader from '../static/images/loading.png';

const Table = ({ teams }) => {
  //TODO: sort teams by wins first and by goals second
  //TODO: dodać ile meczy ktoś zagrał
  const sortedTeams = teams
    .sort((a, b) => b.goals - a.goals)
    .sort((a, b) => b.wins - a.wins);
  return (
    <>
      <p className="pilkarzyki__bests-title">Tabela rozgrywek</p>
      {teams.length ? (
        <table style={{ marginBottom: 40 }}>
          <tr className="pilkarzyki__bests-row">
            <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
              Nazwa drużyny
            </td>
            <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
              Rozegrane spotkania
            </td>
            <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
              Wygrane
            </td>
            <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
              Przegrane
            </td>
            <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
              Ilość bramek
            </td>
          </tr>
          {sortedTeams.map(best => (
            <tr className="pilkarzyki__bests-row" key={best.name}>
              <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
                {best.name}
              </td>
              <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
                {best.playedGames}
              </td>
              <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
                {best.wins}
              </td>
              <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
                {best.losses}
              </td>
              <td className="pilkarzyki__bests-best pilkarzyki__bests-best--small">
                {best.goals}
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <Image height={500} placeholder="blur" src={Loader} width={500} />
      )}
    </>
  );
};

Table.propTypes = {
  teams: PropTypes.array,
};

export default Table;
