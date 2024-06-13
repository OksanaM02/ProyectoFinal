import React from 'react';
import Pasteles from './Pasteles';
import Navbar from './Navbar';

const PaginaPasteles = () => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Pasteles />
      </main>
    </div>
  );
};

export default PaginaPasteles;
