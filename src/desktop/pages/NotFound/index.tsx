import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      NotFound

      <Link to="/">
        HomePage
      </Link>
    </div>
  );
}

export default NotFound;
