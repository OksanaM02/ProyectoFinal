import React from 'react';
import Pasteles from './Pasteles';
import Navbar from './Navbar';

const PaginaPasteles = () => {
  return (
    <div className="main">
      <Navbar />
      <main className="main-content">
        <Pasteles />
      </main>
    </div>
  );
};

export default PaginaPasteles;
