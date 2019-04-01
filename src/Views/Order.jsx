import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MaterialList from '../Components/MaterialList';
import { ORDER_FRAGMENT } from '../fragments';

const FIND_ORDER = gql`
  query($id: ID!) {
    order(id: $id) {
      ...orderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const Order = ({ match, auth }) => {
  const id = match.params.id;
  const { isAuthenticated } = auth;

  return (
    <>
      {isAuthenticated() && (
        <Query query={FIND_ORDER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error.message}`;

            return <MaterialList items={data.order.items} orderID={id} />;
          }}
        </Query>
      )}
    </>
  );
};

export default Order;
