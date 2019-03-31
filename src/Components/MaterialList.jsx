import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Search from './Search';
import { ORDER_FRAGMENT } from '../fragments';

const ADD_ORDER_ITEM = gql`
  mutation($orderID: ID!, $productID: String!, $name: String!, $uom: String!) {
    addOrderItem(input: { id: $orderID, productID: $productID, name: $name, uom: $uom }) {
      ...orderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const MaterialList = ({ items, orderID }) => {
  items.sort((a, b) => b.dateAdded - a.dateAdded);

  return (
    <Mutation mutation={ADD_ORDER_ITEM} variables={{ orderID }}>
      {(addItem, { error }) => (
        <>
          <div className="box">
            <Search addItem={addItem} />
          </div>
          {items.map(item => (
            <Item key={item.id} item={item} orderID={orderID} />
          ))}
          {/* <button className="submit">Send Order</button> */}
        </>
      )}
    </Mutation>
  );
};

const Item = ({ item: { id, name, uom, quantityRequested }, orderID }) => {
  return (
    <div className="box">
      <div className="name">{name}</div>
      <Quantity quantity={quantityRequested} productID={id} orderID={orderID} />
      <div className="uom">{uom}</div>
    </div>
  );
};

const MODIFY_REQUESTED_QUANTITY = gql`
  mutation($orderID: ID!, $productID: String!, $input: Int!) {
    modifyRequestedQuantity(input: { id: $orderID, productID: $productID, quantity: $input }) {
      ...orderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

const Quantity = ({ quantity, productID, orderID }) => {
  const [input, setInput] = useState(quantity);
  const [editable, setEditable] = useState(false);

  const focusInput = input => input && input.focus();

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = (e, func) => {
    e.preventDefault();
    e.target.blur();
    setEditable(false);

    if (input === '' || isNaN(input)) {
      setInput(0);
      return func({ variables: { input: 0 } });
    }

    setInput(parseInt(input, 10));
    func({ variables: { input: parseInt(input, 10) } });
  };

  return editable ? (
    <Mutation mutation={MODIFY_REQUESTED_QUANTITY} variables={{ orderID, productID }}>
      {(modifyQuantity, { error }) => (
        <form className="quantity" onSubmit={e => handleSubmit(e, modifyQuantity)}>
          <input
            ref={focusInput}
            value={input}
            onChange={handleChange}
            onFocus={e => e.target.select()}
            onBlur={e => handleSubmit(e, modifyQuantity)}
            pattern="[0-9]*"
            type="tel"
            autoComplete="off"
            maxLength="6"
          />
        </form>
      )}
    </Mutation>
  ) : (
    <div className="quantity" onFocus={() => setEditable(true)} tabIndex="0">
      {input.toLocaleString()}
    </div>
  );
};

export default MaterialList;
