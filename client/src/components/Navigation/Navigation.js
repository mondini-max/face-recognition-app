import { useContext } from 'react';
import NavigationSTYLE from './Navigation.module.css';
import { UserContext } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = ({
  setImageUrlPath,
  setBoundingBoxArea,
  setSearchInput,
}) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignout = () => {
    setUser(null);
    setBoundingBoxArea({});
    setImageUrlPath('');
    setSearchInput('');
    navigate('/signin');
  };

  if (user !== null) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NavLink
          onClick={handleSignout}
          className='f3 link dim white underline pa3 pointer'
        >
          Sign Out
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NavLink className='f3 link dim white underline pa3 pointer' to={'/'}>
          Home
        </NavLink>
        <NavLink
          className='f3 link dim white underline pa3 pointer'
          to={'/signin'}
        >
          Sign In
        </NavLink>
        <NavLink
          className='f3 link dim white underline pa3 pointer'
          to={'/register'}
        >
          Register
        </NavLink>
      </nav>
    );
  }
};

export default Navigation;
