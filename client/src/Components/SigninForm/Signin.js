import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user, setUser } = useContext(UserContext);
  const onEmailChange = (e) => {
    const emailEntries = e.target.value.toLowerCase().trim();
    setEmail(emailEntries);
  };

  const onPasswordChange = (e) => {
    const passwordEntries = e.target.value.toLowerCase().trim();
    setPassword(passwordEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/signing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (res) => await res.json())
      .then(async (newuser) => {
        const NotValideuser = await newuser
          ?.toLowerCase()
          .includes('not found');
        if (NotValideuser) {
          setErrorMessage('please register to use our services');
          return;
        }

        if (
          newuser !== 'incorrect username and / or password' ||
          newuser !== 'Not Found'
        ) {
          setErrorMessage('');
          await setUser(newuser);
          setEmail('');
          setPassword('');
          onRouteChange('home');
        } else {
          setErrorMessage('Incorrect email or password');
        }
      })
      .catch((error) => {
        // console.log({ error });
        setErrorMessage('Incorrect email or password');
        return;
      });
  };

  return (
    <div className='br3 ba white b--white mv4 w-100 w-50-m w-25-1 mw6 center bg-black bw1'>
      <main className='pa4 f3 white-80'>
        <form onSubmit={handleSubmit} className='measure tc'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
            {errorMessage}
            <div className='mt3'>
              <label className='db fw6 lh-copy f4' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white'
                type='email'
                name='email-address'
                id='email-address'
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f4' htmlFor='password'>
                Password
              </label>
              <div>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>
            </div>
          </fieldset>
          <div className='white'>
            <input
              disabled={email === '' && password === '' ? true : false}
              className='b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib white'
              type='submit'
              value='Sign in'
            />
          </div>
          <div className='lh-copy mt3 f4'>
            <p
              onClick={() => onRouteChange('register')}
              className=' link dim white db f6 pointer'
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Signin;
