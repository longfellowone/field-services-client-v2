import history from '../history';
import auth0 from 'auth0-js';

const Auth = ({ AUTH_CONFIG }) => {
  let accessToken; // For API use
  let idToken; // For application use (contains user information)
  let expiresAt;
  let userProfile;

  const auth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.audience,
    responseType: 'token id_token',
    scope: 'openid manage:orders', // profile
  });

  const login = () => auth.authorize();

  const handleAuthentication = () =>
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        console.log(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });

  const getAccessToken = () => accessToken;
  const getIdToken = () => idToken;

  const getProfile = cb => {
    auth.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        userProfile = profile;
      }
      cb(err, profile);
    });
  };

  const setSession = authResult => {
    expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    accessToken = authResult.accessToken;
    idToken = authResult.idToken;

    localStorage.setItem('isLoggedIn', 'true');
    history.replace('/');
  };

  const renewSession = () =>
    auth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });

  const logout = () => {
    auth.logout({
      returnTo: 'http://localhost:3000/',
      clientId: AUTH_CONFIG.clientId,
    });

    accessToken = null;
    idToken = null;
    expiresAt = 0;
    userProfile = null;

    localStorage.removeItem('isLoggedIn');
  };

  const isAuthenticated = () => new Date().getTime() < expiresAt;

  return {
    login,
    handleAuthentication,
    getAccessToken,
    getIdToken,
    getProfile,
    userProfile,
    renewSession,
    logout,
    isAuthenticated,
  };
};

export default Auth;
