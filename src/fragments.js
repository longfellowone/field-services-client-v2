import gql from 'graphql-tag';

export const ORDER_FRAGMENT = gql`
  fragment orderFragment on Order {
    id
    items {
      name
      id
      uom
      quantityRequested
      dateAdded
    }
  }
`;
