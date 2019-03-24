import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { OrderList } from '../components/OrderList';

const FIND_ORDERS = gql`
  query($id: ID!) {
    projectOrders(projectID: $id) {
      orderID
      sentDate
    }
  }
`;

export const Orders = ({ match }) => (
  <Query query={FIND_ORDERS} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error.message}`;

      return <OrderList orders={data.projectOrders} />;
    }}
  </Query>
);
