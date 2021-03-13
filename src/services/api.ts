import axios from 'axios';

export const github = axios.create({
  baseURL: 'https://github.com',
});

export const api = axios.create({
  baseURL: 'https://api.github.com',
});