import {CUSTOM_NAME_MAX_LENGTH} from "../constants";


export default  (s) => {
  return s.trim() !== '' && s.trim().length <= CUSTOM_NAME_MAX_LENGTH && /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i.test(s);
};
