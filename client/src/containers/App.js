import React, { useState, useEffect, useMemo, Fragment } from 'react';
import Rank from '../components/Rank/Rank';
import Signin from '../components/SigninForm/Signin';
import Register from '../components/Register/Register';
import SearchImageForm from '../components/SearchImageForm/SearchImageForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import { UserContext } from '../context/UserContext';
import { calculateFaceLocation } from '../utils/CalculateFaceLocation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../Layout/SharedLayout';
import { Page404 } from '../components/Page404/Page404';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [ImageUrlPath, setImageUrlPath] = useState('');
  const [boundingBoxArea, setBoundingBoxArea] = useState({});
  const [user, setUser] = useState(null);
  const providerValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setImageUrlPath(searchInput);
  }, [searchInput, user]);

  const onInputChange = (event) => {
    // console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  const displayFaceBoundingBoxes = (box) => {
    // console.log(box);
    setBoundingBoxArea({ boundingBoxArea: box });
  };

  const onButtonSubmit = async () => {
    // console.log('clicked');
    await fetch('http://localhost:4000/smart-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestedImg: searchInput,
      }),
    })
      .then((response) => response.json())
      .then(async (result) => {
        console.log('this is result', { result });
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
          <Route
            path='/'
            element={
              <SharedLayout
                setBoundingBoxArea={setBoundingBoxArea}
                setImageUrlPath={setImageUrlPath}
                setSearchInput={setSearchInput}
              />
            }
          >
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
            <Route exact path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
