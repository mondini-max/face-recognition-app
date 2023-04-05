import React, { useState, useEffect, useMemo, Fragment } from 'react';
import Rank from '../components/Rank/Rank';
import Signin from '../components/SigninForm/Signin';
import Register from '../components/Register/Register';
import SearchImageForm from '../components/SearchImageForm/SearchImageForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import {
  MODEL_ID,
  MODEL_VERSION_ID,
  clarifaiRequestOptionsConfig,
} from '../clarifaiConfigs/ClarifaiConfigs';
import { UserContext } from '../context/UserContext';
import { calculateFaceLocation } from '../utils/CalculateFaceLocation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../Layout/SharedLayout';
import ProtectedRoute from '../utils/ProtectedRoute';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [ImageUrlPath, setImageUrlPath] = useState('');
  const [boundingBoxArea, setBoundingBoxArea] = useState({});
  // const [route, setRoute] = useState('signin');
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState(null);
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
    <UserContext.Provider value={providerValues}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route
              index
              element={
                user === null ? (
                  <Fragment>
                    <h1 className='f2 fw6 ph0 mh0 white-70 tc pt5'>
                      Welcome to smart app
                    </h1>
                  </Fragment>
                ) : (
                  <Fragment>
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
                  </Fragment>
                )
              }
            />
            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
