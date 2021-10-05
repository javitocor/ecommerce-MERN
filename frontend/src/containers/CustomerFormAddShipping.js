/* eslint-disable react/sort-comp */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import {CreateCall} from '../helpers/apiCalls';
import { COUNTRIES} from '../constants/constants';
import style from '../style/CustomerFormAddShipping.module.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const dropMenuCountries = COUNTRIES.map(
  country => <option key={country} value={country}>{country}</option>,
);

class CustomerFormAddShipping extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = (event) => {
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
  };

  async handleSubmit (e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const {createAddress, proceed} = this.props;
    const token = this.getCookie('csrftoken');
    if (this.checkBtn.context._errors.length === 0) {
      const newAddress = await createAddress('shippingAddress', token, this.state)
      proceed(newAddress.shippingAddress._id);
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (`${name  }=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  render(){
    return (
      <div className={`card ${style.card2}`}>
        <Form 
          className="card-body"
          onSubmit={this.handleSubmit}
          ref={(c) => {
              this.form = c;
            }}
        >  
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="name" name="name" className="form-control" placeholder="Name" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="name" className="">Name</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="address" name="address" className="form-control" placeholder="Apartment or suite" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="address" className="">Address</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="city" name="city" className="form-control" placeholder="Add city" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="city" className="">City</label>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <label htmlFor="country">Country</label>
              <Select className="custom-select d-block w-100" name="country" id="country" validations={[required]} onChange={this.handleChange}>
                <option value="">Choose...</option>
                {dropMenuCountries}
              </Select>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="state">State</label>
              <Input type='text' className="form-control" id="state" name="state" validations={[required]} onChange={this.handleChange} />
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="zip">Zip Code</label>
              <Input type="text" name="zipcode" className="form-control" id="zip" validations={[required]} onChange={this.handleChange} />
            </div>
          </div>
          <hr />
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="same-address" checked />
            <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="save-info" checked />
            <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
          </div>
          <hr className="mb-4" />
          <div className="form-group">
            <button
              className="btn btn-info btn-lg btn-block"
              disabled={this.state.loading}
              type="submit"
            >
              {this.state.loading && (
              <span className="spinner-border spinner-border-sm" />
                )}
              <span>Confirm personal data and shipping</span>
            </button>
          </div>
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
                this.checkBtn = c;
              }}
          />
        </Form>
      </div>
    );
  };
};

CustomerFormAddShipping.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  shippingAddress: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    shippingList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  createAddress: PropTypes.func.isRequired,
  proceed:  PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
  shippingAddress: {
    pending: state.shippingAddress.pending,
    error: state.shippingAddress.error,
    shippingList: state.shippingAddress.shippingList,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createAddress: CreateCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormAddShipping);