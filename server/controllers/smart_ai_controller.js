import {
  clarifaiRequestOptionsConfig,
  MODEL_ID,
  MODEL_VERSION_ID,
} from '../Clarifai/ClarifaiConfigs.js';

const smart_ai_controller = async (req, res) => {
  const { requestedImg } = req.body;
  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id
  return await fetch(
    'https://api.clarifai.com/v2/models/' +
      MODEL_ID +
      '/versions/' +
      MODEL_VERSION_ID +
      '/outputs',
    clarifaiRequestOptionsConfig(requestedImg)
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json('unable to get entires'));
};
export default smart_ai_controller;
