import React from 'react';
import RankSTYLE from './Rank.module.css';

const Rank = () => {
  return (
    <div className={RankSTYLE.wrapper}>
      <div className='white f3'>{'John your current rank is...'}</div>
      <div className='white f1'>{'#4'}</div>
    </div>
  );
};

export default Rank;
