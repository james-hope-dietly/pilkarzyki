import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ teams }) => {
  console.log('teams: ', teams);
  return (
    <div>
      <p>to jest tabelka</p>
    </div>
  );
};

Table.propTypes = {
  teams: PropTypes.array,
};

export default Table;
