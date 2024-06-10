import React from 'react';
import styles from './divider.module.css';

interface DividerProps {
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = ({ vertical = false }) => {
  return <div className={vertical ? styles.vertical : styles.horizontal} />;
};

export default Divider;
