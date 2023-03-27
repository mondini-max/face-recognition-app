import React from 'react';
import FaceRecognitionSTYLE from './FaceRecognition.module.css';

const FaceRecognition = ({ ImageUrlPath, box = {} }) => {
  console.log('Face Recognition Component', box);

  return (
    <div className={FaceRecognitionSTYLE.container}>
      <div className={FaceRecognitionSTYLE.wrapper}>
        <img src={ImageUrlPath} alt='people' id='targetImage' />
        {box
          ? box?.boundingBoxArea?.map((face, index) => {
              return (
                <div
                  key={index}
                  className={FaceRecognitionSTYLE.boundingBox}
                  style={{
                    top: face.topRow,
                    right: face.rightCol,
                    bottom: face.bottomRow,
                    left: face.leftCol,
                  }}
                ></div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default FaceRecognition;
