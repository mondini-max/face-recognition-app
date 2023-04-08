import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import Panda from '../../assets/images/pandaIcon.png';

import './Profile.css';
export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className='profile-modal'>
      <div className='br3 mv4 w-100 w-50-m w-25-1 mw6 center bg-lightest-blue  bw1 shadow-2'>
        <main className='pa4 f3 black'>
          <img src={Panda} alt='panda-avatar' className='h3 w3 dib' />
          <h1>{user?.name}</h1>
          <h4>{`Images Submitted: ${user ? user?.entries : 0}`}</h4>
          <h5>{`Member since: ${
            user
              ? new Date(user?.joined).toLocaleDateString()
              : new Date().toLocaleDateString()
          }`}</h5>
          <label className='mt2 fw6' htmlFor='username'>
            Name:
          </label>
          <input
            className='pa2 ba w-100 hover-bg-near-white'
            type='text'
            // value={name}
            // onChange={onNameChange}
            placeholder='John doe'
            name='username'
            id='username'
          />
          <label className='mt2 fw6 ' htmlFor='userAge'>
            age:
          </label>
          <input
            className='pa2 br5 ba w-100 hover-bg-near-white'
            type='number'
            // value={name}
            // onChange={onNameChange}
            placeholder='45'
            name='userAge'
            id='userAge'
          />
          <label className='mt2 fw6' htmlFor='userPet'>
            Pet:
          </label>
          <input
            className='pa2 ba w-100 hover-bg-near-white'
            type='text
            '
            // value={name}
            // onChange={onNameChange}
            placeholder='cat'
            name='userPet'
            id='userPet'
          />
          <div
            className='mt4'
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <button className='b br3 ph4 pv2 grow pointer hover-black bg-light-blue b--black-20'>
              Save
            </button>
            <button className='b ph4  br4 grow pointer hover-black bg-light-red b--black-20'>
              cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
