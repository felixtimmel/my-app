import React from "react";
import logo from '../_assets/Inscription 1/Logo.svg';
import { Link } from "react-router-dom";
import '../sideDrawer/DrawerToggleBtn';
import "./_navbar.scss";
import DrawerToggleBtn from "../sideDrawer/DrawerToggleBtn";

const Navbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-btn">
        <DrawerToggleBtn click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__navigation-logo">
        <Link to='/'><img src={logo} alt='Logo prepacours' /></Link>
      </div>
      {/* <div className="toolbar__navigation-spacer" /> */}
      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/singunp'>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Navbar;