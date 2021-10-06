import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="d-flex flex-column align-items-center justify-content-center mt-5">
    <h1>404 - Not Found!</h1>
    <Link 
      to="/"
      className="btn btn-info btn-lg mt-3"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;