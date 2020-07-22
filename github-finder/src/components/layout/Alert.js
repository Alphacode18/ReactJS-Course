import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fa fa-info-cirle' /> {alert.message}
      </div>
    )
  );
};

export default Alert;
