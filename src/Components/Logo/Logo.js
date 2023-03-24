import React from 'react';
import Tilt from 'react-parallax-tilt';
import LogoStyle from './Logo.module.css';
import FaceImage from './reconnaissance-faciale.png';

const Logo = () => {
  return (
    <div className={`mt0 flex ma4 br4`}>
      <Tilt
        className={` parallax-effect-glare-scale ${LogoStyle.Tilt} br2 shadow-2`}
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <div className={`pa3`}>
          <img src={FaceImage} alt='face recognition' srcset='' />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
