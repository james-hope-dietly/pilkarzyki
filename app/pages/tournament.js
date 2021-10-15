import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import {
  addTeam,
  convertDataFromDB,
  getTeams,
  // resetTeams,
} from '../firebase/firestore/firestoreActions';
import { CustomModal } from '../components/helpers/CustomModal';
import { useForm } from 'react-hook-form';
import Table from '../components/Table';

const Tournament = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const teamToAdd = {
      name: data.teamInput,
      wins: 0,
      losses: 0,
      goals: 0,
    };
    setTeams(prev => [...prev, teamToAdd]);
    return addTeam(teamToAdd);
  };
  //Get users from DB
  useEffect(() => {
    convertDataFromDB(getTeams).then(data => setTeams(data));
  }, []);

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
        <p>Czy na pewno chcesz zresetować tablekę?</p>
        <button
          onClick={() => {
            setTeams([]);
            setIsResetOpen(false);
            getTeams.then(data =>
              data.forEach(document => document.ref.delete())
            );
          }}
        >
          Tak
        </button>
      </CustomModal>
      <Page classes="flex-center-column">
        {teams.length ? (
          <>
            <Table teams={teams} />
            <div>
              <button
                className="tournament__start"
                onClick={() => setIsModalOpen(true)}
              >
                Dodaj drużynę
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
