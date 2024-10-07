import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>Book & Assignment Management System, Copyright &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;