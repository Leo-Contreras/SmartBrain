import React, { Component } from 'react'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai, { FACE_DETECT_MODEL } from "clarifai";
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "3bf375abe6fb4194936287c3d114137a",
});

const particleOptions = {
 
  "particles": {
    "number": {
        "value": 100
    },
    "size": {
        "value": 10
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
}
}

    class App extends Component { 
      constructor(){
        super();
        this.state = {
          input : '',
          imageUrl : ''
        }
      }

      onInputChange = (event) => {
         this.setState({input :event.target.value});
        }
      
      onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models
        .predict(FACE_DETECT_MODEL, this.state.input).then(
          function (response) {
            // response data fetch from FACE_DETECT_MODEL 
           
            console.log(
              response.outputs[0].data.regions[0].region_info.bounding_box
            );
          },
          function (err) {
            // there was an error
          }
        );
      };
      
   
      render() {
        return (
        <div className="App"> 
        <Particles className ='particles' params={particleOptions} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm 
           onInputChange = {this.onInputChange}
           onButtonSubmit = {this.onButtonSubmit}
           /> 
          <FaceRecognition imageUrl ={this.state.imageUrl}/>
        
        </div>
      );
     } 
    }

    export default App;