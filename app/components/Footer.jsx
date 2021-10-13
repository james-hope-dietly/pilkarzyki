import React from 'react';

const Footer = () => {
  return (
    <footer className="pilkarzyki__footer">
      <div className="pilkarzyki__footer-container">
        <span className="pilkarzyki__footer-title">{` © Piłkarzyki by `}</span>
        <a
          className="pilkarzyki__footer-author"
          href="https://github.com/james-hope"
          rel="noreferrer"
          target="_blank"
        >
          jameshope
        </a>
      </div>
    </footer>
  );
};

export default Footer;
