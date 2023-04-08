import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProfileIcon } from '../DropdownMenu/ProfileIconMenu';

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

  if (user === null) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '2em',
        }}
      >
        <ProfileIcon handleSignout={handleSignout} />
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
