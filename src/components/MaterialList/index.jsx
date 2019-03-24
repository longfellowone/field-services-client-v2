import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Search from '../Search';

export const MaterialList = ({ items, orderID, addItem }) => {
  items = items = items.map(item => <Item key={item.productID} item={item} orderID={orderID} />);

  return (
    <>
      <Search addItem={addItem} />
      {items}
      <button className="submit">Send Order</button>
    </>
  );
};

const Item = ({ item: { productID, name, uom, quantityRequested }, orderID }) => {
  return (
    <div className="box item">
      <div className="name">{name}</div>
      <Quantity quantity={quantityRequested} />
      <div className="uom">{uom}</div>
    </div>
  );
};

const Quantity = ({ quantity }) => {
  const [input, setInput] = useState(quantity);
  const [editable, setEditable] = useState(false);

  const focusInput = input => input && input.focus();

  const handleBlur = () => {
    setEditable(false);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    e.target.select();
  };

  return editable ? (
    <>
      <div className="quantity">
        <input
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={focusInput}
          pattern="[0-9]*"
          type="tel"
          autoComplete="off"
          maxLength="6"
        />
      </div>
    </>
  ) : (
    <>
      <div className="quantity" onClick={() => setEditable(true)}>
        {input}
      </div>
    </>
  );
};

// export const MaterialList = ({ items, orderID }) => {
//   items = items.map(item => <Item key={item.productID} item={item} orderID={orderID} />);
//   return items;
// };

// const MODIFY_REQUESTED_QUANTITY = gql`
//   mutation($orderID: ID!, $productID: String!, $input: Int!) {
//     modifyRequestedQuantity(input: { orderID: $orderID, productID: $productID, quantity: $input })
//   }
// `;

// const Item = ({ item: { productID, name, uom, quantityRequested }, orderID }) => {
//   if (quantityRequested === 0) quantityRequested = '';
//   const [input, setInput] = useState(quantityRequested);

//   const handleChange = e => {
//     e.preventDefault();
//     setInput(e.target.value);
//   };

//   const handleFocus = e => {
//     e.preventDefault();
//     if (!input) return; // Bug fix, text dissapears on iOS when re entering text after delete
//     e.target.select();
//   };

//   const handleBlur = (e, func) => {
//     if (e.target.value === '') {
//       return func({ variables: { input: 0 } });
//     }
//     if (e.target.value === '0') setInput('');
//     func({ variables: { input } });
//   };

//   return (
//     <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1 shadow-md">
//       <div className="flex">{name}</div>
//       <div className="flex">
//         <Mutation mutation={MODIFY_REQUESTED_QUANTITY} variables={{ orderID, productID }}>
//           {(modifyQuantity, { error }) => (
//             <input
//               value={input}
//               name={productID}
//               onChange={handleChange}
//               onFocus={handleFocus}
//               onBlur={e => handleBlur(e, modifyQuantity)}
//               className="outline-none bg-transparent appearance-none rounded-none border-none text-right text-black w-16 p-0 pr-1 sm:w-32"
//               placeholder="0"
//               pattern="[0-9]*"
//               type="tel"
//               autoComplete="off"
//             />
//           )}
//         </Mutation>
//         <div className="font-bold">{uom}</div>
//       </div>
//     </li>
//   );
// };
