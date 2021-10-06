/* eslint-disable radix */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { SingleCall } from '../helpers/apiCalls';
import style from '../style/ProductDetail.module.css';
import placeholder from '../assets/placeholder.png';
import {updateCookieData} from '../actions/cookies';

class ProductDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      numberItems: 1,
    };
  }
  
  async componentDidMount() {
    const { getProduct, location } = this.props;
    const { id } = location.state;
    try {
      await getProduct('products', id);
    } catch (error) {
      console.log(error)
    }        
  }

  handleChange = (e) => {
    this.setState({
      numberItems: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {updateCookie, products} = this.props;
    const {product} = products;
    updateCookie('cart', product._id, parseInt(this.state.numberItems));
  }

  render(){
    const {products} = this.props;
    const {product} = products;
    return (
      <main className="mt-5 pt-4">
        <div className="container dark-grey-text mt-5">
          <div className="row wow fadeIn">
            <div className="col-md-6 mb-4">

              <img src={product.image} className="img-fluid" alt="" />

            </div>
            <div className="col-md-6 mb-4">
              <div className="p-4">

                <div className="mb-3">
                  {product.category && product.category.map(cat=>(
                    <a href="">
                      <span className="badge badge-info mr-1">{cat.name}</span>
                    </a>
                  ))}
                </div>

                <p className="lead">
                  <span className="mr-1">
                    <del>$200</del>
                  </span>
                  <span>
                    $
                    {product.price}
                  </span>
                </p>

                <p className="lead font-weight-bold">{product.name}</p>

                <p>
                  {product.description}

                </p>

                <form className="d-flex justify-content-left">
                  <input type="number" value={this.state.numberItems} aria-label="Search" className="form-control" style={{width: "100px"}} onChange={this.handleChange} />
                  <button className="btn btn-primary btn-md my-0 p" type="submit" onClick={this.handleSubmit}>
                    Add to cart
                    <i className="fas fa-shopping-cart ml-1" />
                  </button>

                </form>

              </div>
            </div>
          </div>
          <hr />
          <div className="row d-flex justify-content-center wow fadeIn">
            <div className="col-md-6 text-center">

              <h4 className="my-4 h4">Additional information</h4>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus suscipit modi sapiente illo soluta odit
                voluptates,
                quibusdam officia. Neque quibusdam quas a quis porro? Molestias illo neque eum in laborum.

              </p>

            </div>

          </div>
          <div className="row wow fadeIn">
            <div className="col-lg-4 col-md-12 mb-4">

              <img src={placeholder} className="img-fluid" alt="" />

            </div>
            <div className="col-lg-4 col-md-6 mb-4">

              <img src={placeholder} className="img-fluid" alt="" />

            </div>
            <div className="col-lg-4 col-md-6 mb-4">

              <img src={placeholder} className="img-fluid" alt="" />

            </div>

          </div>

        </div>
      </main>
  
    );
  };  
};

ProductDetail.propTypes = {
  products: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    product: PropTypes.object,
  }).isRequired,  
  getProduct: PropTypes.func.isRequired,
  updateCookie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: {
    error: state.products.error,
    product: state.products.product,
    pending: state.products.pending,
  },  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProduct: SingleCall,
  updateCookie: updateCookieData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);