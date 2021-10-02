/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/label-has-associated-control */
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

class ProductDetail extends Component {

  async componentDidMount() {
    try {
    } catch (error) {
      console.log(error)
    }        
  }

  render(){
    return (
      <main className="mt-5 pt-4">
    <div className="container wow fadeIn">
      <h2 className="my-5 h2 text-center">Checkout form</h2>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card">
            <form className="card-body">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="md-form ">
                    <input type="text" id="firstName" className="form-control" />
                    <label htmlFor="firstName" className="">First name</label>
                  </div>

                </div>
                <div className="col-md-6 mb-2">
                  <div className="md-form">
                    <input type="text" id="lastName" className="form-control" />
                    <label htmlFor="lastName" className="">Last name</label>
                  </div>

                </div>

              </div>
              <div className="md-form input-group pl-0 mb-5">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" className="form-control py-0" placeholder="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="md-form mb-5">
                <input type="text" id="email" className="form-control" placeholder="youremail@example.com" />
                <label htmlFor="email" className="">Email (optional)</label>
              </div>
              <div className="md-form mb-5">
                <input type="text" id="address" className="form-control" placeholder="1234 Main St" />
                <label htmlFor="address" className="">Address</label>
              </div>

              <div className="md-form mb-5">
                <input type="text" id="address-2" className="form-control" placeholder="Apartment or suite" />
                <label htmlFor="address-2" className="">Address 2 (optional)</label>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">

                  <label htmlFor="country">Country</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>

                </div>
                <div className="col-lg-4 col-md-6 mb-4">

                  <label htmlFor="state">State</label>
                  <select className="custom-select d-block w-100" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>

                </div>
                <div className="col-lg-4 col-md-6 mb-4">

                  <label htmlFor="zip">Zip</label>
                  <input type="text" className="form-control" id="zip" placeholder="" required />
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>

                </div>

              </div>

              <hr />

              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="same-address" />
                <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
              </div>

              <hr />

              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                  <label className="custom-control-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required />
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input type="text" className="form-control" id="cc-number" placeholder="" required />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

            </form>

          </div>

        </div>
        <div className="col-md-4 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3 z-depth-1">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Product name</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$12</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Second product</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$8</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Third item</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">-$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-secondary btn-md waves-effect m-0" type="button">Redeem</button>
              </div>
            </div>
          </form>

        </div>

      </div>

    </div>
    <footer className="page-footer text-center font-small mt-4 wow fadeIn">
    <div className="pt-4">
      <a className="btn btn-outline-white" href="https://mdbootstrap.com/docs/jquery/getting-started/download/" target="_blank" role="button">
        Download MDB
        <i className="fas fa-download ml-2" />
      </a>
      <a className="btn btn-outline-white" href="https://mdbootstrap.com/education/bootstrap/" target="_blank" role="button">
        Start free tutorial
        <i className="fas fa-graduation-cap ml-2" />
      </a>
    </div>

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
      © 2018 Copyright:
      <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> MDBootstrap.com </a>
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
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);