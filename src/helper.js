import {CUSTOM_NAME_MAX_LENGTH, NAME_MAX_LENGTH} from "./constants";

export const testName = (s) => {
  return s.trim() !== '' && s.trim().length <= NAME_MAX_LENGTH && /^[a-z][a-z0-9]*$/i.test(s);
};

export const testCustomName = (s) => {
  return s.trim() !== '' && s.trim().length <= CUSTOM_NAME_MAX_LENGTH && /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i.test(s);
};
