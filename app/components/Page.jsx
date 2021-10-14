import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Footer from './Footer';

const Page = ({ children, classes }) => {
  return (
    <div className="pilkarzyki__container">
      <Navigation />
      <div className="pilkarzyki__separator" />
      <div className={`pilkarzyki__main ${classes ?? ''}`}>{children}</div>
      <div className="pilkarzyki__separator" />
      <Footer />
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.string,
};

export default Page;
