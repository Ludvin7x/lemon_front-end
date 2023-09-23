import React from 'react';
import logo from '../img/Logo.svg';
import './Header.css'

function Header() {
  return (
    <header>
<img src={logo} alt='Logo'></img>
    </header>
  );
}

export default Header;