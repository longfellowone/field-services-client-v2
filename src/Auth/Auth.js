import history from '../history';
import auth0 from 'auth0-js';

const Auth = ({ AUTH_CONFIG }) => {
  let accessToken;
  let idToken;
  let expiresAt;

  const auth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid',
  });

  const login = () => auth.authorize();

  const handleAuthentication = () =>
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });

  const getAccessToken = () => accessToken;
  const getIdToken = () => idToken;

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
    accessToken = null;
    idToken = null;
    expiresAt = 0;

    localStorage.removeItem('isLoggedIn');
    history.replace('/');
  };

  const isAuthenticated = () => new Date().getTime() < expiresAt;

  return {
    login,
    handleAuthentication,
    getAccessToken,
    getIdToken,
    renewSession,
    logout,
    isAuthenticated,
  };
};

export default Auth;
