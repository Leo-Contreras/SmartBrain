import React from 'react';


const FaceRecognition = ({ imageUrl }) => {

    return (
      
        <div className = 'center ma'>
        <div className = 'abosulte mt2' >
          <img alt ='face' id = 'inputImage' className='imagen' src={imageUrl} width='500px' height='auto' />
        </div>
        </div>
    );
}

export default FaceRecognition;