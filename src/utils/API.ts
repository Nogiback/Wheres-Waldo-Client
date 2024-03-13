import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchLevels() {
  const res = await axios.get(`${API_URL}/levels`);
  return res.data;
}

export async function fetchLevel(levelID: string) {
  const res = await axios.get(`${API_URL}/levels/${levelID}`);
  return res.data;
}

export async function fetchScores() {
  const res = await axios.get(`${API_URL}/scores`);
  return res.data;
}

export async function addLevel(levelDetails: object) {
  const res = await axios.post(`${API_URL}/levels`, levelDetails);
  return res.data;
}

export async function updateLevel(levelID: string, levelDetails: object) {
  const res = await axios.put(`${API_URL}/levels/${levelID}`, levelDetails);
  return res.data;
}

export async function fetchLevelScores(levelID: string) {
  const res = await axios.get(`${API_URL}/levels/${levelID}/scores`);
  return res.data;
}

export async function fetchLevelScore(levelID: string, scoreID: string) {
  const res = await axios.get(`${API_URL}/levels/${levelID}/scores/${scoreID}`);
  return res.data;
}

export async function addLevelScore(levelID: string, scoreDetails: object) {
  const res = await axios.post(
    `${API_URL}/levels/${levelID}/scores`,
    scoreDetails,
  );
  return res.data;
}
