import React from "react";
import { Link } from "react-router-dom";
import "./_sideDrawer.scss";

const SideDrawer = ({firebaseClass, show, toggleTheme, drawerClickHandler}) => {
  let drawerClass = "side-drawer";
  if (show) {
    drawerClass = "side-drawer open";
  }
  return (
    <nav className={drawerClass}>
      <ul>
        <li>
          <Link onClick={() => drawerClickHandler()} to='/home'>Home</Link>
        </li>
        <li>
          <Link onClick={() => drawerClickHandler()} to='/login'>Login</Link>
        </li>
        <li>
          <Link onClick={() => drawerClickHandler()} to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link onClick={() => drawerClickHandler()} to='/'>Landing</Link>
        </li>
        <li>
          <Link onClick={() => drawerClickHandler()} to='/params'>Parameters</Link>
        </li>
        <li>
          <button onClick={() => toggleTheme()}>Change Theme</button>
        </li>
        <li>
          <button onClick={() => firebaseClass.signOut()}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
