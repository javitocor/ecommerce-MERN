/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { SingleCall, itemsByOrder } from '../helpers/apiCalls';
import style from '../style/OrderDetail.module.css';

const OrderDetail = props => {
  const {getDetail, orders, location, shippingAddress, orderItems, getProducts} = props;
  const {totalItems, totalAmount} = location.state;
  const {order} = orders;
  const {singleShippingAddress} = shippingAddress;
  const {orderItemsList} = orderItems;
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const {id, shippingId} = location.state;
        if (id) {
          const orderSingle = await getDetail('orders', id);
          await getDetail('shippingAddress', shippingId);
          await getProducts(orderSingle._id);
          setIsPending(false);
        } else {
          const orderSingle = await getDetail('orders', props.match.params.id);
          await getDetail('shippingAddress', shippingId);
          await getProducts(orderSingle._id);
          setIsPending(false);
        }
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);
  
  return isPending ? <div className="d-flex justify-content-center align-items-center pt-5 w-100"><Spinner animation="grow" /></div> : (
    <div className={style.content}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
              <h1 className="main-title float-left">
                Order Id:
                {' '}
                {order._id}
              </h1> 
              <h3 className={order.complete ? 'text-success' : 'text-warning'}>
                Status:
                {' '}
                {order.complete ? 'Complete' : 'Pending'}
              </h3>                 
            </div>  
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-xl-4">
            <div className={`card ${style.cardbox} bg-info d-flex flex-row justify-content-between align-items-center`}>
              <div>
                <h6 className="text-white text-uppercase ">Total Items</h6>
                <h1 className=" text-white ">{totalItems}</h1>
              </div>
              <div>
                <i className="fas fa-shopping-cart text-white" />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-xl-4">
            <div className={`card ${style.cardbox} bg-info d-flex flex-row justify-content-between align-items-center`}>
              <div>
                <h6 className="text-white text-uppercase ">Total Amount</h6>
                <h1 className=" text-white ">{totalAmount}</h1>
              </div>
              <div>
                <i className="fas fa-dollar-sign text-white" />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-xl-4">
            <div className={`card ${style.cardbox} bg-info d-flex flex-row justify-content-between align-items-center`}>
              <div>
                <h6 className="text-white text-uppercase ">Order date</h6>
                <h1 className=" text-white ">{order.date_order.substring(0, 10)}</h1>
              </div>
              <div>
                <i className="far fa-calendar-alt text-white" />
              </div>
            </div>
          </div>          
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
            <div className="card border-info mb-3">
              <div className="card-header d-flex flex-row justify-content-between align-items-center py-2">
                <div>
                  <h6 className="font-weight-bold text-info">Products Information</h6>
                </div>
                <div className="text-info">
                  <i className="fas fa-tshirt" />
                </div>
              </div>
              <div className="card-body">
                {orderItemsList.map(product=>(
                  <div className="card card-body mb-3">
                    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                      <div className="mr-2 mb-3 mb-lg-0"> 
                        {' '}
                        <img src={product.product.image} width="150" height="150" alt="" />
                        {' '}
                      </div>
                      <div className="media-body">
                        <h6 className="media-title font-weight-semibold"> 
                          {' '}
                          <Link
                            to={{
                              pathname: `/product/${product.product.name}`,
                              state: { 
                                id: product.product._id,
                              }
                            }}
                            className="text-info"
                            id="list-home-list"
                            data-toggle="list"
                            role="tab"
                            aria-controls="home"
                          >
                            {product.product.name}
                          </Link>
                          {' '}
                        </h6>
                        <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                          <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">{product.category}</a></li>
                          <li className="list-inline-item"><a href="#" className="text-muted" data-abc="true">{product.category}</a></li>
                        </ul>
                        <p className="mb-3">
                          {product.product.description.substring(0, 100)}
                          ...
                          {' '}
                        </p>
                        <ul className="list-inline list-inline-dotted mb-0">
                          <li className="list-inline-item text-info">
                            Quantity:
                            {' '}
                            <span className="text-dark">{product.quantity}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                        <h3 className="mb-0 font-weight-semibold text-info">
                          $
                          {product.product.price}
                        </h3>
                        <div className="text-warning"> 
                          {' '}
                          <i className="fa fa-star" /> 
                          {' '}
                          <i className="fa fa-star" /> 
                          {' '}
                          <i className="fa fa-star" /> 
                          {' '}
                          <i className="fa fa-star" />
                          {' '}
                        </div>
                        <div className="text-muted text-info">1985 reviews</div> 
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer bg-transparent border-info">Enjoy Free Shipping for all Products!</div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
            <div className="card border-info mb-3">
              <div className="card-header d-flex flex-row justify-content-between align-items-center py-2">
                <div>
                  <h6 className="font-weight-bold text-info">Shipping Information</h6>
                </div>
                <div className="text-info">
                  <i className="fas fa-shipping-fast" />
                </div>
              </div>
              <div className="card-body text-info">
                <h5 className="card-title">{singleShippingAddress.name}</h5>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-info">
                    <i className="fas fa-address-card" />
                    {' '}
                    Address:
                    {' '}
                    {singleShippingAddress.address}
                  </li>
                  <li className="list-group-item list-group-item-info">
                    <i className="fas fa-city" />
                    {' '}
                    City:
                    {' '}
                    {singleShippingAddress.city}
                  </li>
                  <li className="list-group-item list-group-item-info">
                    <i className="fas fa-flag" />
                    {' '}
                    State:
                    {' '}
                    {singleShippingAddress.state}
                  </li>
                  <li className="list-group-item list-group-item-info">
                    <i className="fas fa-sort-numeric-up-alt" />
                    {' '}
                    ZipCode:
                    {' '}
                    {singleShippingAddress.zipcode}
                  </li>
                  <li className="list-group-item list-group-item-info">
                    <i className="fas fa-globe-asia" />
                    {' '}
                    Country:
                    {' '}
                    {singleShippingAddress.country}
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-info">Enjoy Free Shipping for all Products!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderDetail.propTypes = {
  orders: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    order: PropTypes.object,
  }).isRequired, 
  shippingAddress: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    singleShippingAddress: PropTypes.object,
  }).isRequired, 
  orderItems: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    orderItemsList: PropTypes.object,
  }).isRequired, 
  getDetail: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: {
    error: state.orders.error,
    order: state.orders.order,
    pending: state.orders.pending,
  },
  shippingAddress: {
    error: state.shippingAddress.error,
    singleShippingAddress: state.shippingAddress.singleShippingAddress,
    pending: state.shippingAddress.pending,
  },
  orderItems: {
    error: state.orderItems.error,
    orderItemsList: state.orderItems.orderItemsList,
    pending: state.orderItems.pending,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetail: SingleCall,
  getProducts: itemsByOrder,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);