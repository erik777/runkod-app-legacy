import {UserSession, AppConfig} from 'blockstack';
import {configure} from 'radiks-patch';
import {decodeToken} from 'jsontokens';

const RADIKS_URL = `https://${window.location.protocol === 'http:' ? 'radiks-dev.runkod.com' : 'radiks.runkod.com'}`;

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/auth', '/manifest.json')
});

configure({
  apiServer: RADIKS_URL,
  userSession
});


export const decodeUserResponseToken = () => {
  const {authResponseToken} = userSession.loadUserData();
  return decodeToken(authResponseToken);
};

export const getUsername = () => {
  const {username} = decodeUserResponseToken().payload;
  return username;
};
