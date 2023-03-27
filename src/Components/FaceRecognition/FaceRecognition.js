import React, { useState, useEffect } from 'react';
import FaceRecognitionSTYLE from './FaceRecognition.module.css';

const FaceRecognition = ({ ImageUrlPath, box = {} }) => {
  console.log(box);

  return (
    <div className={FaceRecognitionSTYLE.container}>
      <div className={FaceRecognitionSTYLE.wrapper}>
        <img src={ImageUrlPath} alt='people' id='targetImage' />
        <div
          className={FaceRecognitionSTYLE.boundingBox}
          style={{
            top: box?.boundingBoxArea?.topRow,
            right: box?.boundingBoxArea?.rightCol,
            bottom: box?.boundingBoxArea?.bottomRow,
            left: box?.boundingBoxArea?.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
