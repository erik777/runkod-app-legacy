import axios from 'axios';

export const hostIp = host =>
  axios
    .get(`https://manager-api.runkod.com/host-ip?host=${host}`)
    .then(resp => resp.data);
