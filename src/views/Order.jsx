import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { MaterialList } from '../components/MaterialList';

export const Order = ({ match }) => {
  const id = match.params.id;

  const FIND_ORDER = gql`
    query($id: ID!) {
      order(orderID: $id) {
        items {
          name
          productID
          uom
          quantityRequested
        }
      }
    }
  `;

  return (
    <Query query={FIND_ORDER} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error.message}`;

        return <MaterialList items={data.order.items} orderID={id} />;
      }}
    </Query>
  );
};
