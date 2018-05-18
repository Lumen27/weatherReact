import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
    constructor(props) {
     super(props);
     this.state = {
         lat: "",
         lon: "",
         vidSrc: "",
         tempC: "",
         tempF: "",
         currentTemp: "",
         city: "",
         country: "",
         condition: "",
         tempUnit: "C",
         otherUnit: "F"
     };
     this.changeTemp = this.changeTemp.bind(this);
    }

    getWeather() {
        axios.get("https://api.apixu.com/v1/current.json?key=b32cf9a3c9af46559ea143356172512&lang=ru&q=" + this.state.lat + "," + this.state.lon).then(res => {
            this.setState ({
                tempC: res.data.current.temp_c,
                tempF: res.data.current.temp_f,
                city: res.data.location.name,
                country: res.data.location.country,
                condition: res.data.current.condition.text,
                currentTemp: res.data.current.temp_c
            });
            if (this.state.tempC >= 18) {
                this.setState({vidSrc:"https://www.videvo.net/videvo_files/converted/2013_07/preview/HS020.mov20945.webm"})
            } else if (this.state.tempC <= 0) {
                this.setState({vidSrc:"https://www.videvo.net/videvo_files/converted/2012_08/preview/Snow-H264%2075.mov93355.webm"})
            } else {
                this.setState({vidSrc:"https://www.videvo.net/videvo_files/converted/2014_12/preview/046.mp430300.webm"})
            }
        });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(location => {
            this.setState({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            });
            this.getWeather();
        });
    }


    changeTemp() {
        let newTempUnit = this.state.tempUnit;
        if (newTempUnit === "F") {
            this.setState({
                tempUnit: "C",
                currentTemp: this.state.tempC,
                otherUnit: "F"
            })
        } else if (newTempUnit === "C") {
            this.setState({
                tempUnit: "F",
                currentTemp: this.state.tempF,
                otherUnit: "C"
            })
        }

    }




  render() {
    return (
        <div className="container">
                <div className="video-wrap">
                    <video id="bgVid" src={this.state.vidSrc} autoPlay loop muted>
                    </video>
                </div>

            <div className="content">
                <h1>{this.state.city}, {this.state.country}</h1>
                <p>{this.state.currentTemp}°{this.state.tempUnit}</p>
                <p>{this.state.condition}</p>
                <button onClick={this.changeTemp}>Change to {this.state.otherUnit}</button>
            </div>
        </div>
    );
  }
}

export default App;




