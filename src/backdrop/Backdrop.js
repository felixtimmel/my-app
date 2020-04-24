import React from 'react';
import './_backdrop.scss';

const Backdrop = props => (
  <div className="backdrop" onClick={props.click}></div>
);

export default Backdrop;
