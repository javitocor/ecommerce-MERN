/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import style from '../style/CustomerShippingAddresses.module.css';

const CustomerShippingAddresses = props => {
  const {addresses, remove} = props;

  function handleDelete(addressId) {
    remove('shippingAddress', addressId)
  }
  
  return (
    <div className="container-fluid">
      <div className={`${style.form} ${style.cf} mt-5"`}>
        <section className={`${style.plan} ${style.cf} d-flex flex-column"`}>
          {addresses.map(address => (
            <>
              <label className="d-flex flex-row justify-content-between align-items-center mb-3" htmlFor="free">
                <div className={style.left}>Basic</div>
                <div className={style.center}>
                  <div className="row text-left h-100">
                    <div className="col-3">
                      Address:
                    </div>
                    <div className="col-9">
                      {address.address}
                    </div>
                    <div className="col-3">
                      City:
                    </div>
                    <div className="col-9">
                      {address.city}
                    </div>
                    <div className="col-3">
                      State:
                    </div>
                    <div className="col-9">
                      {address.state}
                    </div>
                    <div className="col-3">
                      Country:
                    </div>
                    <div className="col-9">
                      {address.country}
                    </div>
                    <div className="col-3">
                      ZipCode:
                    </div>
                    <div className="col-9">
                      {address.zipcode}
                    </div>
                  </div>
                </div>
                <div className={style.right}>
                  <Link
                    to={{
                        pathname: `/shippingaddress/${address.name}/edit`,
                        state: { address }
                      }}
                    className="btn btn-dark mb-3"
                    id="list-home-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="home"
                  >
                    <i className="far fa-edit mr-2" />
                    Edit
                  </Link>
                  <div className="btn btn-danger" onClick={()=>handleDelete(address._id)}>
                    <i className="fas fa-trash-alt mr-2" />
                    {' '}
                    Delete
                  </div>
                </div>
              </label>
            </>
        ))}
        </section>	
      </div>
    </div>
  );
};

CustomerShippingAddresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

export default CustomerShippingAddresses;