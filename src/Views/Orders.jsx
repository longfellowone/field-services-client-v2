import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import OrderList from '../Components/OrderList';

const FIND_ORDERS = gql`
  query($id: ID!) {
    projectOrders(id: $id) {
      id
      sentDate
    }
  }
`;

const Orders = ({ match, auth }) => {
  const { isAuthenticated } = auth;
  const id = match.params.id;

  return (
    <>
      {isAuthenticated() && (
        <h4>
          <div style={{ cursor: 'pointer', color: 'blue' }} onClick={auth.logout}>
            Logout
          </div>
        </h4>
      )}
      <Query query={FIND_ORDERS} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error.message}`;

          return <OrderList orders={data.projectOrders} projectID={id} />;
        }}
      </Query>
    </>
  );
};

export default Orders;
