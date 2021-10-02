/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateCookieData} from '../actions/cookies';
import style from '../style/CartItem.module.css';

class CartItem extends React.Component{
  constructor(props) {
    super(props);
    const {product} = this.props;
    this.state= { 
      quantity: product.quantity,
    };
  }

  handleChange = (event) => {
    this.setState({quantity: event.target.value})
  };

  handleSubmit = (event) => {
    const {product, updateCart} = this.props;
    event.preventDefault();
    updateCart('cart', product._id, this.state.quantity)
  };

  handleDelete = (event) => {
    const {product, updateCart} = this.props;
    event.preventDefault();
    updateCart('cart', product._id, 0)
  };

  render() {
    const {product} = this.props;
    return (
      <tr>
        <td><img src={product.product.image} className={style.imgcart} /></td>
        <td>
          <strong>{product.product.name}</strong>
        </td>
        <td>
          <form className="form-inline">
            <input className="form-control" type="text" name={product._id} value={this.state.quantity} onChange={this.handleChange} />
            <button rel="tooltip" className="btn btn-default" onSubmit={this.handleSubmit}><i className="fa fa-pencil" /></button>
            <a className="btn btn-primary" onClick={this.handleDelete}><i className="fa fa-trash-o" /></a>
          </form>
        </td>
        <td>
          $
          {product.price}
        </td>
        <td>
          $
          {product.get_total}
        </td>
      </tr>
    )
  }
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired,  
  updateCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCart: updateCookieData,
}, dispatch);

export default connect(null, mapDispatchToProps)(CartItem);