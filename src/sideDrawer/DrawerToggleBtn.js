import React from 'react';
import './_drawerToggleBtn.scss'

const DrawerToggleBtn = props => (
  <button className="toggle-btn" onClick={props.click}>
  <div className="toggle-btn__line"></div>
  <div className="toggle-btn__line"></div>
  <div className="toggle-btn__line"></div>
  </button>
);

export default DrawerToggleBtn;