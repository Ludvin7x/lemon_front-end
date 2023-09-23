import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Tu Nombre o Nombre de la Empresa</p>
      </div>
    </footer>
  );
}

export default Footer;
