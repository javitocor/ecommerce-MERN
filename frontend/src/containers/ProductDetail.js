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

class ProductDetail extends Component {

  async componentDidMount() {
    const { getSingle, auth, location } = this.props;
    const { id } = location.state;
    const { customer } = auth;
    try {
      await getSingle('products', id, customer.customer);
    } catch (error) {
      console.log(error)
    }        
  }

  render(){
    return (
      <main className="mt-5 pt-4">
    <div className="container dark-grey-text mt-5">
      <div className="row wow fadeIn">
        <div className="col-md-6 mb-4">

          <img src={placeholder} className="img-fluid" alt="" />

        </div>
        <div className="col-md-6 mb-4">
          <div className="p-4">

            <div className="mb-3">
              <a href="">
                <span className="badge purple mr-1">Category 2</span>
              </a>
              <a href="">
                <span className="badge blue mr-1">New</span>
              </a>
              <a href="">
                <span className="badge red mr-1">Bestseller</span>
              </a>
            </div>

            <p className="lead">
              <span className="mr-1">
                <del>$200</del>
              </span>
              <span>$100</span>
            </p>

            <p className="lead font-weight-bold">Description</p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa
              sint voluptatibus!
              Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia sapiente.

            </p>

            <form className="d-flex justify-content-left">
              <input type="number" value="1" aria-label="Search" className="form-control" style={{width: "100px"}} />
              <button className="btn btn-primary btn-md my-0 p" type="submit">
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
    <footer className={`${style.pagefooter} text-center font-small mt-4 wow fadeIn`}>
    <hr className="my-4" />
    <div className="pb-4">
      <a href="https://www.facebook.com/mdbootstrap" target="_blank">
        <i className="fab fa-facebook-f mr-3" />
      </a>

      <a href="https://twitter.com/MDBootstrap" target="_blank">
        <i className="fab fa-twitter mr-3" />
      </a>

      <a href="https://www.youtube.com/watch?v=7MUISDJ5ZZ4" target="_blank">
        <i className="fab fa-youtube mr-3" />
      </a>

      <a href="https://plus.google.com/u/0/b/107863090883699620484" target="_blank">
        <i className="fab fa-google-plus-g mr-3" />
      </a>

      <a href="https://dribbble.com/mdbootstrap" target="_blank">
        <i className="fab fa-dribbble mr-3" />
      </a>

      <a href="https://pinterest.com/mdbootstrap" target="_blank">
        <i className="fab fa-pinterest mr-3" />
      </a>

      <a href="https://github.com/mdbootstrap/bootstrap-material-design" target="_blank">
        <i className="fab fa-github mr-3" />
      </a>

      <a href="http://codepen.io/mdbootstrap/" target="_blank">
        <i className="fab fa-codepen mr-3" />
      </a>
    </div>
    <div className="footer-copyright py-3">
      © 2018 Copyright: JaviCorp      
    </div>

    </footer>
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
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  getSingle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: {
    error: state.products.error,
    product: state.products.product,
    pending: state.products.pending,
  },
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProduct: SingleCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);