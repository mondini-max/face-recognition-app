import React, { useState, useEffect, Fragment, useMemo } from 'react';
import './App.css';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import Signin from './Components/SigninForm/Signin';
import Register from './Components/Register/Register';
import SearchImageForm from './Components/SearchImageForm/SearchImageForm';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import {
  MODEL_ID,
  MODEL_VERSION_ID,
  clarifaiRequestOptionsConfig,
} from './Components/ClarifaiConfigs/ClarifaiConfigs';
import { UserContext } from './context/UserContext';
import { calculateFaceLocation } from './Components/utils/CalculateFaceLocation';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [ImageUrlPath, setImageUrlPath] = useState('');
  const [boundingBoxArea, setBoundingBoxArea] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setisSignedIn] = useState(false);

  const [user, setUser] = React.useState(null);
  const providerValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setImageUrlPath(searchInput);
  }, [searchInput, user]);

  const onInputChange = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  const displayFaceBoundingBoxes = (box) => {
    console.log(box);
    setBoundingBoxArea({ boundingBoxArea: box });
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setisSignedIn(false);
    } else if (route === 'home') {
      setisSignedIn(true);
    }
    setRoute(route);
  };

  const onButtonSubmit = async () => {
    // console.log('clicked');
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    await fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/versions/' +
        MODEL_VERSION_ID +
        '/outputs',
      clarifaiRequestOptionsConfig(searchInput)
    )
      .then((response) => response.json())
      .then(async (result) => {
        // console.log('this is result', { result });
        if (result.status.code === 10000) {
          // calculateFaceLocation(result);
          try {
            await fetch('http://localhost:4000/image', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: user?.id,
              }),
            }).then((res) =>
              res.json().then((count) => {
                // console.log(count);
                setUser((prev) => ({ ...prev, entries: count.entries }));
              })
            );
            return displayFaceBoundingBoxes(
              await calculateFaceLocation(result)
            );
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <Fragment>
      <UserContext.Provider value={providerValues}>
        <div className='App'>
          <ParticlesBg num={200} type='thick' bg={true} />
          <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
          <Logo />
          {route === 'home' ? (
            <>
              <Rank />
              <SearchImageForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
              {ImageUrlPath.length !== 0 ? (
                <FaceRecognition
                  box={boundingBoxArea}
                  ImageUrlPath={ImageUrlPath}
                />
              ) : null}
            </>
          ) : route === 'signin' ? (
            <Signin onRouteChange={onRouteChange} />
          ) : (
            <Register onRouteChange={onRouteChange} />
          )}
        </div>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
