import React from 'react';
import SearchImageFormSTYLE from './SearchImageForm.module.css';

const SearchImageForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className={SearchImageFormSTYLE.wrapper}>
      <div className='w-70'>
        <p className={`f3 white`}>
          {'Lets detect face in your image. Get it a try'}
        </p>
        <div className={`pa4 br3 shadow-5 ${SearchImageFormSTYLE.formWrapper}`}>
          <input
            className={`f4 pa2 w-70 center`}
            type='text'
            name=''
            id=''
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className={`w-30 grow f4 link pv2 dib white bg-dark-blue ttu b-none pointer`}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchImageForm;
