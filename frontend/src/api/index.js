import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/Auth.context';

const baseUrl = import.meta.env.VITE_API_URL; 
const axios = axiosRoot.create({ baseURL: baseUrl});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

//GET
const getAll = async (url) => {
  const { data } = await axios.get(url);
  return data.items;
};

async function getById(url) {
  const {data} = await axios.get(url);
  return data;
}

async function getTuningsByInstrumentId(url) {
  const {data} = await axios.get(url);
  return data;
}

async function getNotesByTuningId(url) {
  const {data} = await axios.get(url);
  return data;
}

async function getTrackofTheDay(url) {
  const {data} = await axios.get(url);
  return data;
}

//POST
async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${url}/${id ?? ''}`,
    data,
  });
}

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);
  return data;
};

//PUT
const update = async (url, { arg: id, body }) => {
  await axios.put(`${url}/${id}`, body);
};

//DELETE
const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
};

export {getAll,getById,getTuningsByInstrumentId,getNotesByTuningId, getTrackofTheDay,save,update,deleteById}; 