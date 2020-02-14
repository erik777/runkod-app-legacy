import axios from 'axios';
import {MANAGER_API_ADDR} from './config';

export const extractDomain = name => axios
  .get(`${MANAGER_API_ADDR}/domain-extract?name=${name}`)
  .then(resp => resp.data);


export const verifyDomain = _id => axios
  .post(`${MANAGER_API_ADDR}/domain-verification`, {
    _id,
  })
  .then(resp => resp.data);
