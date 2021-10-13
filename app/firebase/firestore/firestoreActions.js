import firebase from '/firebase/config/firebase.config';

const db = firebase.firestore();

export const convertDataFromDB = async apiCall => {
  const dataFromFB = await apiCall;
  const docs = dataFromFB.docs;
  return await docs.map(doc => doc.data());
};

export const getTeams = db.collection('teams').get();

export const getBests = db.collection('bests').get();
