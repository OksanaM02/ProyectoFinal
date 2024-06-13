import React from 'react';
import Navbar from './Navbar';
import Pedidos from './Pedidos';
import styles from './Service.module.css';

const Service = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <Pedidos />
    </div>
  );
}

export default Service;
