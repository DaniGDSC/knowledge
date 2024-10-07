import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="container">
        <div id="branding">
          <h1>Book & Assignment Manager</h1>
        </div>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'current' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/books' ? 'current' : ''}>
              <Link to="/books">Books</Link>
            </li>
            <li className={location.pathname === '/assignments' ? 'current' : ''}>
              <Link to="/assignments">Assignments</Link>
            </li>
            <li className={location.pathname === '/profile' ? 'current' : ''}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;