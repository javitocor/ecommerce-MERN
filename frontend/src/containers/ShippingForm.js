/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { UpdateCall, CreateCall, DeleteCall } from '../helpers/apiCalls';
import { COUNTRIES} from '../constants/constants';
import style from '../style/ShippingForm.module.css';

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


class ShippingForm extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      customer: this.props.auth.customer.customer._id,
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipcode: 0,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { location} = this.props;
    const { type } = location.state;
    if (type === 'update') {
      const { address } = location.state;
      delete address.order;
      this.setState(address)
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit (event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { location, createAddress, updateAddress, auth } = this.props;
    const {customer} = auth;
    const { type, address } = location.state;
    const token = this.getCookie('csrftoken');
    try {
      this.form.validateAll();
      if (this.checkBtn.context._errors.length === 0) {
        if(type === 'create') {       
          await createAddress('shippingAddress', token, this.state);
          this.props.history.push({
            pathname:`/customer/${customer.customer.username}`,
            state: {
              id: customer.customer._id,
            },
          });
        } else if (type === 'update') {        
          await updateAddress('shippingAddress', token, this.state, address._id);
          this.props.history.push({
            pathname:`/customer/${customer.customer.username}`,
            state: {
              id: customer.customer._id,
            },
          });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
      
    } catch (error) {
      console.log(error)
    }
  }  

  async handleDelete (e) {
    const { location, deleteAddress, auth } = this.props;
    const {customer} = auth;
    const { address } = location.state;
    const token = this.getCookie('csrftoken');
    try {
      await deleteAddress('shippingAddress', token, address._id)
      this.props.history.push({
        pathname:`/customer/${customer.customer.username}`,
        state: {
          id: customer.customer._id,
        },
      });
    } catch(error) {
      console.log(error)
    }
  }

  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (`${name  }=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


  render() {
    const { location} = this.props;
    const { type } = location.state;
    return(
      <div className="container">
        <div className={style.content}>
          <h1 className={`${style.title} text-info`}>
            {type === 'create' ? 'Create' : 'Update'}
            {' '}
            Shipping Address
          </h1>
          <Form 
            className="card-body"
            onSubmit={this.handleSubmit}
            ref={(c) => {
                this.form = c;
              }}
          >  
            <div className={`${style.mdform} mb-5`}>
              <Input type="text" id="name" name="name" className="form-control" value={this.state.name} placeholder="Name" onChange={this.handleChange} validations={[required]} />
              <label htmlFor="name" className="">Name</label>
            </div>
            <div className={`${style.mdform} mb-5`}>
              <Input type="text" id="address" name="address" className="form-control" value={this.state.address} placeholder="Apartment or suite" onChange={this.handleChange} validations={[required]} />
              <label htmlFor="address" className="">Address</label>
            </div>
            <div className={`${style.mdform} mb-5`}>
              <Input type="text" id="city" name="city" className="form-control" placeholder="Add city" value={this.state.city} onChange={this.handleChange} validations={[required]} />
              <label htmlFor="city" className="">City</label>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-4">
                <label htmlFor="country">Country</label>
                <Select className="custom-select d-block w-100" name="country" id="country" value={this.state.country} validations={[required]} onChange={this.handleChange}>
                  <option value="">Choose...</option>
                  {dropMenuCountries}
                </Select>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <label htmlFor="state">State</label>
                <Input type='text' className="form-control" id="state" name="state" value={this.state.state} placeholder='Add State' validations={[required]} onChange={this.handleChange} />
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <label htmlFor="zip">Zip Code</label>
                <Input type="text" name="zipcode" className="form-control" id="zip" value={this.state.zipcode} placeholder='Add Zipcode' validations={[required]} onChange={this.handleChange} />
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
                <span>{type === 'create' ? 'Create Shipping Addres' : 'Edit Shipping Address'}</span>
              </button>
              {type === 'update' ? (
                <button
                  type="submit"
                  className="btn btn-danger btn-lg btn-block"
                  onClick={e =>
                window.confirm("Are you sure you want to delete this Shipping Address?") &&
                this.handleDelete()
            }
                >
                  <i className="fas fa-trash-alt" />
                  {' '}
                  Delete Address
                </button>
            )
            : (<></>)}
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                  this.checkBtn = c;
                }}
            />
          </Form>
        </div>
      </div>
    );
  };
};

ShippingForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({ 
      address: PropTypes.object.isRequired, 
      type: PropTypes.string.isRequired 
    }),
  }).isRequired, 
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  createAddress: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createAddress: CreateCall,
  updateAddress: UpdateCall,
  deleteAddress: DeleteCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm);
