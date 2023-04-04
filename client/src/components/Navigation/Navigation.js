import { useContext } from 'react';
import NavigationSTYLE from './Navigation.module.css';
import { UserContext } from '../../context/UserContext';

const Navigation = ({ isSignedIn }) => {
  const { user, setUser } = useContext(UserContext);
  const handleSignout = () => {
    setUser(null);
  };
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={handleSignout}
          className='f3 link dim white underline pa3 pointer'
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim white underline pa3 pointer'>Sign In</p>
        <p className='f3 link dim white underline pa3 pointer'>Register</p>
      </nav>
    );
  }
};

export default Navigation;
