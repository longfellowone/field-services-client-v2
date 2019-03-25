import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Search from './Search';
import { FIND_ORDER } from '../views/Order';

const ADD_ORDER_ITEM = gql`
  mutation($orderID: ID!, $productID: String!, $name: String!, $uom: String!) {
    addOrderItem(input: { orderID: $orderID, productID: $productID, name: $name, uom: $uom })
  }
`;

export const MaterialList = ({ items, orderID }) => (
  <Mutation
    mutation={ADD_ORDER_ITEM}
    variables={{ orderID }}
    refetchQueries={[{ query: FIND_ORDER, variables: { id: orderID } }]}
  >
    {(addItem, { error }) => (
      <>
        <Search addItem={addItem} />
        {items.map(item => (
          <Item key={item.productID} item={item} orderID={orderID} />
        ))}
        <button className="submit">Send Order</button>
      </>
    )}
  </Mutation>
);

const Item = ({ item: { productID, name, uom, quantityRequested }, orderID }) => {
  return (
    <div className="box item">
      <div className="name">{name}</div>
      <Quantity quantity={quantityRequested} productID={productID} orderID={orderID} />
      <div className="uom">{uom}</div>
    </div>
  );
};

const MODIFY_REQUESTED_QUANTITY = gql`
  mutation($orderID: ID!, $productID: String!, $input: Int!) {
    modifyRequestedQuantity(input: { orderID: $orderID, productID: $productID, quantity: $input })
  }
`;

const Quantity = ({ quantity, productID, orderID }) => {
  const [input, setInput] = useState(quantity);
  const [editable, setEditable] = useState(false);

  const focusInput = input => input && input.focus();

  const handleBlur = (e, func) => {
    setEditable(false);

    if (e.target.value === '') {
      setInput(0);
      return func({ variables: { input: 0 } });
    }

    setInput(parseInt(e.target.value));
    func({ variables: { input: e.target.value } });
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    e.target.select();
  };

  return editable ? (
    <div className="quantity">
      <Mutation mutation={MODIFY_REQUESTED_QUANTITY} variables={{ orderID, productID }}>
        {(modifyQuantity, { error }) => (
          <input
            value={input}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={e => handleBlur(e, modifyQuantity)}
            ref={focusInput}
            pattern="[0-9]*"
            type="tel"
            autoComplete="off"
            maxLength="6"
          />
        )}
      </Mutation>
    </div>
  ) : (
    <div className="quantity" onFocus={() => setEditable(true)} tabIndex="0">
      {input}
    </div>
  );
};
