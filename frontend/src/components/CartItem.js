/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    const {product} = this.props;
    this.props.handleQuantity(product._id, this.state.quantity)
  };

  handleDelete = (event) => {
    const {product} = this.props;
    this.props.deleteProduct(product._id)
  };

  render() {
    const {product} = this.props;
    return (
      <tr>
        <td><img src={product.product.image} className={style.imgcart} /></td>
        <td>
          <Link 
            className=""
            id="list-home-list"
            data-toggle="list"
            role="tab"
            aria-controls="home"
            to={{
              pathname: `/product/${product.product.name}`,
              state: {
                id: product.product._id,
              },
            }}
          >
            {product.product.name}
          </Link>
        </td>
        <td>
          <form className="form-inline">
            <input className="form-control" type="number" name={product._id} value={this.state.quantity} onChange={this.handleChange} />
            <div className="btn btn-primary mr-2 ml-2" onClick={this.handleSubmit}><i className="far fa-edit" /></div>
            <div className="btn btn-danger" onClick={this.handleDelete}><i className="fas fa-trash-alt" /></div>
          </form>
        </td>
        <td>
          $
          {product.product.price}
        </td>
        <td>
          $
          {product.get_total}
        </td>
      </tr>
    )
  }
};


CartItem.propTypes = {
  product: PropTypes.object.isRequired,  
};


export default CartItem;