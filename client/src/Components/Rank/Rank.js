import React, { useContext } from 'react';
import RankSTYLE from './Rank.module.css';
import { UserContext } from '../../context/UserContext';

const Rank = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={RankSTYLE.wrapper}>
      <div className='white f2'>{`${user?.name} your current rank is...`}</div>
      <div className='white f1'>{`#${user?.entries}`}</div>
    </div>
  );
};

export default Rank;
