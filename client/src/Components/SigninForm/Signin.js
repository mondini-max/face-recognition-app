import React from 'react';

const Signin = ({ onRouteChange }) => {
  return (
    <div className='br3 ba white b--white mv4 w-100 w-50-m w-25-1 mw6 center bg-black bw1'>
      <main className='pa4 f3 white-80'>
        <form method='POST' className='measure tc'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f4' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white'
                type='email'
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f4' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className='white'>
            <input
              onClick={() => onRouteChange('home')}
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
