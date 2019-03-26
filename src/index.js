import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

import { Dashboard } from './views/Dashboard';
import { Orders } from './views/Orders';
import { Order } from './views/Order';
import { Test } from './Test';

const client = new ApolloClient({
  uri: 'http://192.168.0.104:8080/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <div className="container"> */}
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/order/:id" component={Order} />
          <Route path="/" component={Dashboard} exact />
          <Route path="/:id" component={Orders} />
        </Switch>
        {/* </div> */}
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
