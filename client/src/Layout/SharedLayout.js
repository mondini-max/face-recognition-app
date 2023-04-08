import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';

export const SharedLayout = ({
  setBoundingBoxArea,
  setImageUrlPath,
  setSearchInput,
}) => {
  return (
    <Fragment>
      <ParticlesBg num={200} type='thick' bg={true} />
      <Navigation
        setBoundingBoxArea={setBoundingBoxArea}
        setImageUrlPath={setImageUrlPath}
        setSearchInput={setSearchInput}
      />
      <Logo />
      <Outlet />
    </Fragment>
  );
};
