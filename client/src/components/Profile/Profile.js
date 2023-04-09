import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';

import Panda from '../../assets/images/pandaIcon.png';

import './Profile.css';
export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name);
  const [age, setAge] = useState(user?.age);
  const [pet, setPet] = useState(user?.pet);
  const location = useLocation();
  const userId = location.pathname.split('/').pop();

  const onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      case 'userAge':
        setAge(event.target.value);
        break;
      case 'userPet':
        setPet(event.target.value);
        break;
      default:
        return;
    }
    console.log(name, pet, age);
  };
  const onProfileUpdate = async () => {
    await fetch(`http://localhost:4000/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInfo: {
          name,
          pet,
          age,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

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
          <label className='mt2 fw6' htmlFor='user-name'>
            Name:
          </label>
          <input
            className='pa2 ba w-100 hover-bg-near-white'
            type='text'
            // value={name}
            // onChange={onNameChange}
            placeholder='John doe'
            name='user-name'
            id='user-name'
            onChange={onFormChange}
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
            onChange={onFormChange}
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
            onChange={onFormChange}
          />
          <div
            className='mt4'
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <button
              onClick={() => onProfileUpdate()}
              className='b br3 ph4 pv2 grow pointer hover-black bg-light-blue b--black-20'
            >
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
