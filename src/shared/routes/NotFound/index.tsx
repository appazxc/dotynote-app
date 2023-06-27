import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      NotFound

      <div>
        <Link to="/">
          HomePage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
