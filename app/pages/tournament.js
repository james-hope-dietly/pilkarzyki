import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import {
  addTeam,
  convertDataFromDB,
  getTeams,
  updateTeam,
  // resetTeams,
} from '../firebase/firestore/firestoreActions';
import { CustomModal } from '../components/helpers/CustomModal';
import { useForm } from 'react-hook-form';
import Table from '../components/Table';
import NewResult from '../components/NewResult';

const Tournament = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isNewResult, setIsNewResult] = useState(false);
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');
  const [resultOne, setResultOne] = useState('');
  const [resultTwo, setResultTwo] = useState('');
  const [fetch, setFetch] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const teamToAdd = {
      goals: 0,
      losses: 0,
      name: data.teamInput,
      playedGames: 0,
      wins: 0,
    };
    setTeams(prev => [...prev, teamToAdd]);
    addTeam(teamToAdd);
  };

  const handleNewResult = (teamOne, teamTwo, resultOne, resultTwo) => {
    const teamOneIndex = teams.findIndex(team => team.name === teamOne);
    const teamTwoIndex = teams.findIndex(team => team.name === teamTwo);

    updateTeam(teams[teamOneIndex].id, {
      goals: Number(teams[teamOneIndex].goals) + Number(resultOne),
      losses: teams[teamOneIndex].losses + Number(resultOne > resultTwo),
      name: teamOne,
      playedGames: teams[teamOneIndex].playedGames + 1,
      wins: teams[teamOneIndex].wins + Number(resultOne > resultTwo),
    });
    updateTeam(teams[teamTwoIndex].id, {
      goals: Number(teams[teamTwoIndex].goals) + Number(resultTwo),
      losses: teams[teamTwoIndex].losses + Number(resultOne > resultTwo),
      name: teamTwo,
      playedGames: teams[teamTwoIndex].playedGames + 1,
      wins: teams[teamTwoIndex].wins + Number(resultOne > resultTwo),
    });
    setFetch(true);
    setTeamOne('');
    setTeamTwo('');
    setResultOne('');
    setResultTwo('');
    setIsNewResult(false);
  };

  //Get users from DB
  useEffect(() => {
    convertDataFromDB(getTeams).then(data => setTeams(data));
    setFetch(false);
  }, []);

  useEffect(() => {
    fetch &&
      setTimeout(() => {
        window.location.reload();
      }, 500);
  }, [fetch]);

  //TODO: 1. na otwarcie modala zeruj wartość teamów => po prostu pusta tablica, ale warto wyzerować też na backendzie może? Ewentualnie zapisać po prostu
  //TODO: 2. dodawanie nowych drużyn aż użytkownik kliknie zakończ
  //TODO: 3. po kliknięciu zakończ do bazy zapisują się piłkarze z points: 0, wins: 0, draws: 0, losses: 0
  //TODO: 4. po kliknięciu zakończ pojawia się tabelka z tyloma rzędami ile drużyn i są te pola
  //TODO: 5. pojawia się przycisk "Dodaj wynik" i tam modal z selectami z teamami i inputy z możliwością wpisania wyniku
  //TODO: 6. po zaakceptowaniu wyniku aktualizuje się baza - logika, która dodaje punkty w zależności od wyniku
  //TODO: 7. na aktualizację bazy odpala się useEffect, który robi update tabeli
  //TODO: 8. EWENTUALNIE maszyna do losowania meczów

  return (
    <>
      <CustomModal
        className="pilkarzyki__modal"
        enableClickAway
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <form className="tournament__form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="teamInput">Podaj nazwę drużyny</label>
          <input
            defaultValue=""
            {...register('teamInput', { required: true })}
          />
          {errors.teamInput && (
            <span className="tournament__form-error">Podaj jakąś nazwę</span>
          )}

          <button type="submit">Dodaj drużynę</button>
        </form>
      </CustomModal>
      <CustomModal
        className="pilkarzyki__modal"
        enableClickAway
        isModalOpen={isResetOpen}
        setIsModalOpen={setIsResetOpen}
      >
        <p>Czy na pewno chcesz zresetować rozgrywki?</p>
        <button
          className="tournament__start"
          onClick={() => {
            getTeams.then(data =>
              data.forEach(document => document.ref.delete())
            );
            setTeams([]);
            setIsResetOpen(false);
          }}
        >
          Tak
        </button>
      </CustomModal>
      <CustomModal
        className="pilkarzyki__modal"
        enableClickAway
        isModalOpen={isNewResult}
        setIsModalOpen={setIsNewResult}
      >
        <p className="pilkarzyki__bests-title" style={{ textAlign: 'center' }}>
          Jaki wynik meczu?
        </p>
        <div className="result flex-center-column">
          <div className="flex-center">
            <NewResult setTeam={setTeamOne} teams={teams} />
            <input
              className="result__input"
              defaultValue={''}
              onChange={event => setResultOne(event.target.value)}
              value={resultOne}
            />
            <span>{` : `}</span>
            <input
              className="result__input"
              defaultValue={''}
              onChange={event => setResultTwo(event.target.value)}
              value={resultTwo}
            />
            <NewResult setTeam={setTeamTwo} teams={teams} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="result__button"
            onClick={() =>
              teamOne &&
              teamTwo &&
              resultOne !== '' &&
              resultTwo !== '' &&
              resultOne !== resultTwo &&
              handleNewResult(teamOne, teamTwo, resultOne, resultTwo)
            }
          >
            Zatwierdź wynik
          </button>
        </div>
      </CustomModal>
      <Page classes="flex-center-column">
        {teams.length ? (
          <>
            <Table teams={teams} />
            <div>
              <button
                className="tournament__start"
                onClick={() => setIsNewResult(true)}
              >
                Dodaj wynik
              </button>
              <button
                className="tournament__start"
                onClick={() => setIsModalOpen(true)}
              >
                Dodaj nową drużynę
              </button>
              <button
                className="tournament__start"
                onClick={() => setIsResetOpen(true)}
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <button
            className="tournament__start"
            onClick={() => setIsModalOpen(true)}
          >
            Rozpocznij
          </button>
        )}
      </Page>
    </>
  );
};

export default Tournament;
