import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { MaterialList } from '../components/MaterialList';

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

const ADD_ORDER_ITEM = gql`
  mutation($orderID: ID!, $productID: String!, $name: String!, $uom: String!) {
    addOrderItem(input: { orderID: $orderID, productID: $productID, name: $name, uom: $uom })
  }
`;

export const Order = ({ match }) => {
  const id = match.params.id;
  return (
    <Query query={FIND_ORDER} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error.message}`;

        return (
          <Mutation
            mutation={ADD_ORDER_ITEM}
            variables={{ orderID: id }}
            refetchQueries={[{ query: FIND_ORDER, variables: { id } }]}
          >
            {(addItem, { error }) => (
              <MaterialList items={data.order.items} orderID={match.params.id} addItem={addItem} />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default Order;
