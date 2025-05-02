import axios from 'axios';

const API_URL = '/api/certifications';

export async function getAllCertifications() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getCertification(id: string) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function createCertification(data: any) {
  const res = await axios.post(API_URL, data);
  return res.data;
}

export async function updateCertification(id: string, data: any) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deleteCertification(id: string) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
} 