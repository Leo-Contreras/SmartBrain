import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {

    return (
      
        <div className = 'ma4 mt0'>
            <Tilty className="tilty br2 shadow-2" options={{max : 55}} style={{height: 250, width: 250 }}>
                <div className="inner">
                    <img style= {{paddingTop: '1px' }}alt='logo'src={brain}/> 
                </div>
            </Tilty>
        </div>
    );
}

export default Logo;