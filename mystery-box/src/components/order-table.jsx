import React from 'react';
import { Link } from 'react-router-dom';
import Approve from '../services/approve-service';

const OrdersTable = ({ email, address, telephone, comments, _id, key }) => {
  return (
    <tr key={key}>
      <td>{_id}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{telephone}</td>
      <td>{comments}</td>
      <td onClick={()=> Approve(_id)}><Link to="#">Approve</Link></td>
    </tr>
  )
}

export default OrdersTable;