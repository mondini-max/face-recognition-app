import React, { useState, useEffect } from 'react';
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

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [ImageUrlPath, setImageUrlPath] = useState('');
  const [boundingBoxArea, setBoundingBoxArea] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setisSignedIn] = useState(false);

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:4000/')
      .then((res) => res.json())
      .then((data) => console.log(data));
    // .then((data) => setData(data.message));
  }, []);

  useEffect(() => {
    setImageUrlPath(searchInput);
  }, [searchInput]);

  const onInputChange = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    console.log('this is from function', data);

    const clarifaiAllFaces = data.outputs[0].data.regions.map((value) => {
      return value.region_info.bounding_box;
    });
    // console.log('All faces', clarifaiAllFaces);
    const targetImage = document.getElementById('targetImage');
    const imageWidth = Number(targetImage.width);
    const imageHeight = Number(targetImage.height);
    // console.log(imageWidth, imageHeight);

    const boxesLocation = clarifaiAllFaces.map((box) => {
      return {
        leftCol: box.left_col * imageWidth,
        topRow: box.top_row * imageHeight,
        rightCol: imageWidth - box.right_col * imageWidth,
        bottomRow: imageHeight - box.bottom_row * imageHeight,
      };
    });

    return boxesLocation;
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

  const onButtonSubmit = () => {
    console.log(searchInput, ImageUrlPath);
    // console.log('clicked');
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/versions/' +
        MODEL_VERSION_ID +
        '/outputs',
      clarifaiRequestOptionsConfig(searchInput)
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        // console.log('this is result', { result });
        if (result.status.code === 10000) {
          // calculateFaceLocation(result);
          displayFaceBoundingBoxes(calculateFaceLocation(result));
        }
      })
      .catch((error) => console.log('error', error));
  };
  return (
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
  );
}

export default App;
