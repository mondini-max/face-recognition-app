import * as dotenv from 'dotenv';
dotenv.config();

const {
  CLARIFAI_PAT,
  // CLARIFAI_APIKey,
  CLARIFAI_USER_ID,
} = process.env;

// face recognition model

export const MODEL_ID = 'face-detection';
export const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

// color detection model
// const MODEL_ID = 'color-recognition';
// const MODEL_VERSION_ID = 'dd9458324b4b45c2be1a7ba84d27cd04';

export const clarifaiRequestOptionsConfig = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = CLARIFAI_PAT;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = CLARIFAI_USER_ID;
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
