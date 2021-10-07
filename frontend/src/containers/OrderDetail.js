import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { SingleCall, AllCall } from '../helpers/apiCalls';
import style from '../style/CustomerOrders.module.css';

const OrderDetail = props => {
  const {getDetail, orders, location, shippingAddress, orderItems} = props;
  const {totalItems, totalAmount} = location.state;
  const {order, pending} = orders;
  const {singleShippingAddress} = shippingAddress;
  const {orderItemsList} = orderItems;

  useEffect(() => {
    (async () => {
      try {
        const {id, shipping} = location.state;
        if (id) {
          await getDetail('orders', id);
          await getDetail('shippingAddress', shipping.shippingId);
        } else {
          await getDetail('orders', props.match,params.id);
          await getDetail('shippingAddress', shippingId);
        }
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);

  return pending ? <div className="d-flex justify-content-center align-items-center pt-5 w-100"><Spinner animation="grow" /></div> : (

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
    productsList: state.orderItems.orderItemsList,
    pending: state.orderItems.pending,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetail: SingleCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);