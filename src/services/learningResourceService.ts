import axios from 'axios';

const API_URL = '/api/learning-resources';

export async function getAllLearningResources() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getLearningResource(id: string) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function createLearningResource(data: any) {
  const res = await axios.post(API_URL, data);
  return res.data;
}

export async function updateLearningResource(id: string, data: any) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deleteLearningResource(id: string) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
} 