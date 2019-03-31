import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch, Route } from 'react-router-dom';

import './index.css';

import Auth from './Auth/Auth';
import history from './history';

import Dashboard from './Views/Dashboard';
import Orders from './Views/Orders';
import Order from './Views/Order';
import Callback from './Views/Callback';

const AUTH_CONFIG = {
  domain: 'dev-vqglrbz9.auth0.com',
  clientId: '4Bl87j57GloRtm1GlyZhwEFA3jlDlv66',
  callbackUrl: 'http://localhost:3000/callback',
  audience: 'http://192.168.0.104:8080/graphql',
};

const auth = Auth({ AUTH_CONFIG });

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const client = new ApolloClient({
  uri: 'http://192.168.0.104:8080/graphql',
  request: async operation => {
    const token = auth.getAccessToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${auth.getAccessToken()}` : '',
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if (networkError.statusCode === 401 || 403) {
      //   history.push('/');
      // }
    }
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div className="container">
          <Switch>
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
            <Route path="/order/:id" component={Order} />
            <Route path="/:id" render={props => <Orders auth={auth} {...props} />} />
            <Route path="/" render={props => <Dashboard auth={auth} {...props} exact />} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
