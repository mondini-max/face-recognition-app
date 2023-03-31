import React, { useContext } from 'react';
import RankSTYLE from './Rank.module.css';
import { UserContext } from '../../context/UserContext';

const Rank = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={RankSTYLE.wrapper}>
      <div className='white f3'>{`${user?.name} your current rank is...`}</div>
      <div className='white f1'>{`#${user?.entires}`}</div>
    </div>
  );
};

export default Rank;
