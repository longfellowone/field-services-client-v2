import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const OrderList = ({ orders }) => {
  return orders.map(order => <OrderListItem key={order.id} order={order} />);
};

const OrderListItem = ({ order: { id, sentDate } }) => {
  return (
    <div>
      <Link to={'order/' + id}>
        <Moment date={sentDate} format="MMMM Do YYYY h:mma" unix />
      </Link>
    </div>
  );
};

export default OrderList;
