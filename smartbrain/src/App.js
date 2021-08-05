import React, { Component } from 'react'; 
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from "clarifai";
import Particles from 'react-particles-js';
import SingIn from './components/SingIn/SingIn';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';

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
          imageUrl : '',
          box : {},
          route : 'signin',
          isSignedIn : false ,
        }
      }

      calculateFaceLocation = (response) => {
        
         const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
         const imagen = document.getElementById('inputImage');
         const width = Number(imagen.width);
         const height = Number(imagen.height);
         console.log(width,height);
         console.log(clarifaiFace);
         return {
          leftCol:  (clarifaiFace.left_col * width),
          topRow:  (clarifaiFace.top_row  * height),
          rightCol:  (width - (clarifaiFace.right_col * width)),
          bottomRow:  (height - (clarifaiFace.bottom_row * height))
         }
         
        
      }

      displayFaceBox = (box) => {
        console.log("box :" );
        console.log(box);
        this.setState({box: box});
      };

      onInputChange = (event) => {
         this.setState({input :event.target.value});
        };
      
        onButtonSubmit = () => {
          this.setState({ imageUrl: this.state.input });
          app.models
          .predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            (response) => {
              // response data fetch from FACE_DETECT_MODEL 
              this.displayFaceBox(this.calculateFaceLocation(response));
              

            },
            function (err) {
              // there was an error
            }
          );
        }
      onRoutechange = (route) =>{
        if (route === 'signout') {
          this.setState({isSignedIn: false})
        } else if (route === 'home') {
          this.setState({isSignedIn: true})
         }
        this.setState({route : route});
      }
   
      render() {
        const {isSignedIn, imageUrl, route, box} = this.state ;
        return (
        <div className="App"> 
        <Particles className ='particles' params={particleOptions} />
          <Navigation isSignedIn={isSignedIn} onRoutechange={this.onRoutechange} />
          {route === 'home' 
          ? 
          <div> 
          <Logo /> 
          <Rank />
          <ImageLinkForm 
           onInputChange = {this.onInputChange}
           onButtonSubmit = {this.onButtonSubmit}
           /> 
          <FaceRecognition  box={box} imageUrl = {imageUrl} />
          </div>
        
          : 
          (
            route === 'signin'
            ?<SingIn  onRoutechange={this.onRoutechange}/>
            :<Register onRoutechange={this.onRoutechange}/>

          )

         }
        </div>
      );
     } 
    }

    export default App;