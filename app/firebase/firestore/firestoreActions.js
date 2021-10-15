import firebase from '/firebase/config/firebase.config';

export const db = firebase.firestore();

export const convertDataFromDB = async apiCall => {
  const dataFromFB = await apiCall;
  const docs = dataFromFB.docs;
  return await docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getTeams = db.collection('teams').get();

export const getBests = db.collection('bests').get();

export const addTeam = team => db.collection('teams').add(team);

export const updateTeam = (id, updatedTeam) =>
  db.collection('teams').doc(id).update(updatedTeam);

// export const resetTeams = getTeams.then(data =>
//   data.forEach(document => document.ref.delete())
// );
