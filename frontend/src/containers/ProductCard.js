/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateCookieData} from '../actions/cookies';
import style from '../style/ProductCard.module.css';

const ProductCard = props => {
  const {product, updateCookie} = props;

  function handleSubmit(e){
    e.preventDefault();
    updateCookie('cart', product.id, 1);
  }

  return (
    <div className="col-md-4 mt-2">
      <div className={`${style.card2} card`}>
        <div className={`card-body ${style.cardbody}`}>
          <div className={style.cardimageactions}> 
            {' '}
            <img src={product.image} className={`card-img img-fluid ${style.cardimg}`} width="96" height="350" alt="" />
            {' '}
          </div>
        </div>
        <div className={`card-body bg-light text-center ${style.cardbody}`}>
          <div className="mb-2">
            <h6 className="font-weight-semibold mb-2"> 
              {' '}
              <a href="#" className="text-default mb-2" data-abc="true">{product.name}</a>
              {' '}
            </h6> 
            {' '}
            <a href="#" className="text-muted" data-abc="true">Laptops & Notebooks</a>
          </div>
          <h3 className="mb-0 font-weight-semibold">
            $
            {product.price}
          </h3>
          <div> 
            {' '}
            <i className={`fa fa-star ${style.star}`} /> 
            {' '}
            <i className={`fa fa-star ${style.star}`} /> 
            {' '}
            <i className={`fa fa-star ${style.star}`} /> 
            {' '}
            <i className={`fa fa-star ${style.star}`} />
            {' '}
          </div>
          <div className="text-muted mb-3">34 reviews</div> 
          {' '}
          <button type="button" className={`btn ${style.bgcart}`} onClick={handleSubmit}>
            <i className="fa fa-cart-plus mr-2" />
            {' '}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  updateCookie: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCookie: updateCookieData
}, dispatch);

export default connect(null, mapDispatchToProps)(ProductCard);