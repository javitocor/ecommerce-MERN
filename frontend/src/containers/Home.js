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
import { AllCall } from '../helpers/apiCalls';
import style from '../style/Home.module.css'

class Home extends Component {

  async componentDidMount() {
    const { getAll, auth } = this.props;
    const { customer } = auth;
    try {
      await getAll('products', customer.customer);
    } catch (error) {
      console.log(error)
    }        
  }

  render(){
    return (
        <main>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success mt-3 mb-5">
              <span className="navbar-brand">Categories:</span>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#basicExampleNav"
                aria-controls="basicExampleNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="basicExampleNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      All
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Shirts</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Sport wears</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Outwears</a>
                  </li>

                </ul>
                <form className="form-inline">
                  <div className="md-form my-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  </div>
                </form>
              </div>
            </nav>

            <section className="text-center mb-4">
              <div className="row wow fadeIn">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className={`card ${style.card2}`}>
                    <div className="view overlay">
                      <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg" className="card-img-top" alt="" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                    <div className="card-body text-center">
                      <a href="" className="grey-text">
                        <h5>Shirt</h5>
                      </a>
                      <h5>
                        <strong>
                          <a href="" className="dark-grey-text">
                            Denim shirt
                            <span className="badge badge-pill danger-color">NEW</span>
                          </a>
                        </strong>
                      </h5>
                      <h4 className="font-weight-bold blue-text">
                        <strong>120$</strong>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
            <div className="footer-copyright py-3 text-white">
              © 2018 Copyright:
              <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> JaviCorp </a>
            </div>
    
          </footer>
        </main>
        
    );
  };  
};

Home.propTypes = {
  products: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    productsList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  getAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: {
    error: state.products.error,
    productsList: state.products.productsList,
    pending: state.products.pending,
  },
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: AllCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);