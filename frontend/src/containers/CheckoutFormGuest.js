/* eslint-disable consistent-return */
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
import { isEmail } from "validator";
import { COUNTRIES} from '../constants/constants';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const dropMenuCountries = COUNTRIES.map(
  country => <option key={country} value={country}>{country}</option>,
);

class CheckoutFormGuest extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    };
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {

    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render(){
    return (
      <div className="card">
        <Form 
          className="card-body"
          onSubmit={this.handleSubmit}
          ref={(c) => {
              this.form = c;
            }}
        >
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="md-form ">
                <Input type="text" name="firstname" id="firstName" className="form-control" onChange={this.handleChange} validations={[required]} />
                <label htmlFor="firstName" className="">First name</label>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="md-form">
                <Input type="text" name="lastname" id="lastName" className="form-control" onChange={this.handleChange} validations={[required]} />
                <label htmlFor="lastName" className="">Last name</label>
              </div>
            </div>
          </div>
          <div className="md-form input-group pl-0 mb-5">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <Input type="text" className="form-control py-0" placeholder="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="md-form mb-5">
            <Input type="text" id="email" name="email" className="form-control" placeholder="youremail@example.com" onChange={this.handleChange} validations={[required, email]} />
            <label htmlFor="email" className="">Email</label>
          </div>
          <div className="md-form mb-5">
            <Input type="password" id="password" name="password" className="form-control" placeholder="Add your password" onChange={this.handleChange} validations={[required, vpassword]} />
            <label htmlFor="address" className="">Password</label>
          </div>
          <div className="md-form mb-5">
            <Input type="text" id="phone" name="phone" className="form-control" placeholder="Add your phone number" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="address" className="">Phone</label>
          </div>
          <div className="md-form mb-5">
            <Input type="text" id="address" name="address" className="form-control" placeholder="Apartment or suite" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="address" className="">Address</label>
          </div>
          <div className="md-form mb-5">
            <Input type="text" id="city" name="city" className="form-control" placeholder="Add city" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="city" className="">City</label>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <label htmlFor="country">Country</label>
              <Select className="custom-select d-block w-100" name="country" id="country" validations={[required]}>
                <option value="">Choose...</option>
                {dropMenuCountries}
              </Select>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="state">State</label>
              <Input className="custom-select d-block w-100" id="state" name="state" validations={[required]} />
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="zip">Zip</label>
              <Input type="text" name="zipcode" className="form-control" id="zip" placeholder="" validations={[required]} onChange={this.handleChange} />
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
              className="btn btn-primary btn-lg btn-block"
              disabled={this.state.loading}
              type="submit"
            >
              {this.state.loading && (
              <span className="spinner-border spinner-border-sm" />
                )}
              <span>Confirm personal data</span>
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
}

export default CheckoutFormGuest;