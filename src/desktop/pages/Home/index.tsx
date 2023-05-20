import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      Home

      <Link to="/hello">any page</Link>
    </div>
  );
}

export default Home;
