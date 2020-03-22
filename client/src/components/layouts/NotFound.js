import React, { Fragment } from 'react';

export const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'>Page Not Found</i>
        <p>This Page does not exist</p>
      </h1>
    </Fragment>
  );
};

export default NotFound;
