import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/Layout.css";// Ensure you have a CSS file for common styles

const Layout = ({ children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="container position-relative rounded bg-white ps-5 pt-2 pe-5 pb-2">
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
