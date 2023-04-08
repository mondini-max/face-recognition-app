import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PandaIcon from '../../assets/images/pandaIcon.png';
import { NavLink } from 'react-router-dom';
import { Profile } from '../Profile/Profile';

export const ProfileIcon = ({ handleSignout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag='span'
          data-toggle='dropdown'
          aria-expanded={dropdownOpen}
        >
          <img
            src={PandaIcon}
            className='br-100 ba h3 w3 dib bg-white'
            alt='avatar'
          />
        </DropdownToggle>

        <DropdownMenu
          end
          className={`pa2 b--transparent shadow-5 `}
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            fontSize: '1.4rem',
          }}
        >
          <DropdownItem>
            <NavLink to={'/profile'}>Profile</NavLink>
          </DropdownItem>
          <DropdownItem onClick={() => handleSignout()}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
