import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import OrderList from '../Components/OrderList';

const FIND_ORDERS = gql`
  query($id: ID!) {
    projectOrders(projectID: $id) {
      orderID
      sentDate
    }
  }
`;

const Orders = ({ match, auth }) => {
  const { isAuthenticated } = auth;
  return (
    <>
      {isAuthenticated() && (
        <h4>
          <div style={{ cursor: 'pointer', color: 'blue' }} onClick={auth.logout}>
            Logout
          </div>
        </h4>
      )}
      <Query query={FIND_ORDERS} variables={{ id: match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;

          return <OrderList orders={data.projectOrders} />;
        }}
      </Query>
    </>
  );
};

export default Orders;
