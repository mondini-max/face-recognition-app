import React, { useState } from 'react';

const Register = ({ onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onEmailChange = (e) => {
    const emailEntries = e.target.value.toLowerCase().trim();
    setEmail(emailEntries);
  };

  const onPasswordChange = (e) => {
    const passwordEntries = e.target.value.toLowerCase().trim();
    setPassword(passwordEntries);
  };

  const onNameChange = (e) => {
    const passwordEntries = e.target.value.toLowerCase().trim();
    setName(passwordEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          console.log('bienvenue');
          setErrorMessage('');
          onRouteChange('home');
        } else {
          setErrorMessage('Incorrect email or password');
        }
      })
      .catch((error) => {
        console.log({ error });
      });
    console.log(email, password);
    // setEmail('');
    // setPassword('');
  };
  return (
    <div className='br3 ba white b--white mv4 w-100 w-50-m w-25-1 mw6 center bg-black bw1'>
      <main className='pa4 f3 white-80'>
        <form onSubmit={handleSubmit} className='measure tc'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0'>Register</legend>
            {errorMessage}
            <div className='mt3'>
              <label className='db fw6 lh-copy f4' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white'
                type='email'
                value={email}
                onChange={onEmailChange}
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f4' htmlFor='fullName'>
                Name
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white'
                type='text'
                value={name}
                onChange={onNameChange}
                name='fullName'
                id='fullName'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f4' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                value={password}
                onChange={onPasswordChange}
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className='white'>
            <input
              className='b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib white'
              type='submit'
              value='Register'
            />
          </div>
          <div className='lh-copy mt3 f4'>
            <p
              onClick={() => onRouteChange('signin')}
              className=' link dim white db f6 pointer'
            >
              Sign In
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;
