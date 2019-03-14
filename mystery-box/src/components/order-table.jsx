import React from 'react';
import { Link } from 'react-router-dom'

const OrdersTable = ( { email, address, telephone, comments, _id }) => {
    return (
        <div className="card col-4">`id: {_id}`
        <div className="card-body">
          <h5 className="card-title">{email}</h5>
          <p className="card-text">{address}</p>
          <p className="card-text">{telephone}</p>
          <p className="card-text">{comments}</p>
        </div>
        <div className="card-footer"><small className="text-muted"></small><Link to="button" className="btn btn-primary float-right btn-sm"
          href={`/details/${_id}`}>Details</Link><button type="button" className="btn btn-warning float-right btn-sm">Order</button></div>
      </div>
    )
}

export default OrdersTable;