import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Approve from '../services/approve-service';

const OrdersTable = ({ email, address, telephone, comments, _id, key }) => {
  return (
    <Fragment>
      <tr key={key}>
    <td key={key}>{_id}</td>
    <td key={key}>{email}</td>
    <td key={key}>{address}</td>
    <td key={key}>{telephone}</td>
    <td key={key}>{comments}</td>
    <td onClick={Approve}><Link to="#">Approve</Link></td>
      </tr>
    </Fragment>
    )
}

export default OrdersTable;