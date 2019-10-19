import {NAME_MAX_LENGTH} from "../constants";

export default (s) => {
  return s.trim() !== '' && s.trim().length <= NAME_MAX_LENGTH && /^[a-z][a-z0-9-]*$/i.test(s);
};
