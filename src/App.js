import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import SearchImageForm from './Components/SearchImageForm/SearchImageForm';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

const {
  REACT_APP_CLARIFAI_PAT,
  // REACT_APP_CLARIFAI_APIKey,
  REACT_APP_CLARIFAI_USER_ID,
} = process.env;

// face recognition model

const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

// color detection model
// const MODEL_ID = 'color-recognition';
// const MODEL_VERSION_ID = 'dd9458324b4b45c2be1a7ba84d27cd04';

const clarifaiRequestOptionsConfig = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = REACT_APP_CLARIFAI_PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = REACT_APP_CLARIFAI_USER_ID;
  const APP_ID = 'face-recoginition-app';
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageUrl;

  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [ImageUrlPath, setImageUrlPath] = useState('');
  const [boundingBoxArea, setBoundingBoxArea] = useState({});

  useEffect(() => {
    setImageUrlPath(searchInput);
  }, [searchInput]);

  const onInputChange = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    console.log(
      'this is from function',
      data.outputs[0].data.regions[0].region_info.bounding_box
    );
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const targetImage = document.getElementById('targetImage');
    const imageWidth = Number(targetImage.width);
    const imageHeight = Number(targetImage.height);
    // console.log(imageWidth, imageHeight);
    return {
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - clarifaiFace.right_col * imageWidth,
      bottomRow: imageHeight - clarifaiFace.bottom_row * imageHeight,
    };
  };

  const displayFaceBoundingBoxes = (box) => {
    console.log(box);
    setBoundingBoxArea({ boundingBoxArea: box });
    console.log(boundingBoxArea);
  };

  const onButtonSubmit = () => {
    console.log(searchInput, ImageUrlPath);
    console.log('clicked');

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
      <Navigation />
      <Logo />
      <Rank />
      <SearchImageForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {ImageUrlPath.length !== 0 ? (
        <FaceRecognition box={boundingBoxArea} ImageUrlPath={ImageUrlPath} />
      ) : null}
    </div>
  );
}

export default App;
