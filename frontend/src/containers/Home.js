/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
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
import Carousel from 'react-bootstrap/Carousel'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from './ProductCard';
import { AllCall } from '../helpers/apiCalls';
import style from '../style/Home.module.css';
import generateKey from '../helpers/generateKey';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      count:{
        prev: 0,
        next: 12
      },
      hasMore: true,
      current: [],
    }
  }

  async componentDidMount() {
    const { getAll, auth } = this.props;
    const { customer } = auth;
    try {
      await getAll('products', customer.customer);
      this.setState({current: this.props.products.productsList.slice(this.state.count.prev, this.state.count.next)})
    } catch (error) {
      console.log(error)
    }        
  }

  getMoreData = () => {
    if (this.state.current.length >= this.props.products.productsList.length) {
      this.setState({HasMore: false});
      return;
    }
    setTimeout(() => {
      this.setState({current: this.state.current.concat(this.props.products.productsList.slice(this.state.count.prev + 12, this.state.count.next + 12))})
    }, 2000)
    this.setState({count:{ prev: this.state.count.prev + 12, next: this.state.count.next + 12 }})
  }

  render(){
    const {products} = this.props;
    const {productsList} = products;
    return (
        <main>
          <div className={style.carouselcont}>
          <Carousel fade>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${style.carousel}`}
                src="https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Best Deals!!!</h3>
                <p>Get the best deals in the web!!!.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${style.carousel}`}
                src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Free shipping</h3>
                <p>You do not have to pay extra cost for the shipping.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className={`d-block w-100 ${style.carousel}`}
                src="https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Best brands, New Products</h3>
                <p>the latest products by hand.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>
          <div className="container">            
            <nav className="navbar navbar-expand-lg navbar-dark bg-info mt-3 mb-5">
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
            {productsList.length === 0 ? (<div className="d-flex justify-content-center align-items-center pt-5 w-100"><Spinner animation="grow" /></div>
             ) : (
              <InfiniteScroll
                style={{overflow: 'hidden'}}
                dataLength={this.state.current.length}
                next={this.getMoreData}
                hasMore={this.state.hasMore}
                loader={<div className="d-flex justify-content-center align-items-center pt-5 w-100"><Spinner animation="grow" /></div>}
              >
              <section className="text-center mb-4">
                <div className="row wow fadeIn">
                  {this.state.current && this.state.current.map(product=>(
                    <ProductCard key={generateKey(product._id)} product={product} />
                  ))}
                </div>
              </section>
              </InfiniteScroll>          
            )}
          </div>
          
          <footer className={`${style.pagefooter} text-center font-small mt-4 bg-info`}>
            <hr className="my-4" />
            <div className="pb-4">
              <a href="#" target="_blank">
                <i className="fab fa-facebook-f mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-twitter mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-youtube mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-google-plus-g mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-dribbble mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-pinterest mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-github mr-3" />
              </a>

              <a href="#" target="_blank">
                <i className="fab fa-codepen mr-3" />
              </a>
            </div>
            <div className="footer-copyright py-3 text-white">
              © 2018 Copyright:
              <a href="#" target="_blank"> JaviCorp </a>
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