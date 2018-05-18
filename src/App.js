import React, {Component} from 'react'
import axios from 'axios'
import {RenderContent} from './RenderContent'

import './App.css'
import {ChangeTemp} from "./ChangeTemp";


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
     this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
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

  render() {
    return (
        <div className="container">
            <div className="videoWrap">

            </div>

            <div className="content">
                <RenderContent
                    city={this.state.city}
                    country={this.state.country}
                    currentTemp={this.state.currentTemp}
                    tempUnit={this.state.tempUnit}
                    condition={this.state.condition}
                />
                <ChangeTemp
                    onClick={this.handleClick}
                    otherUnit = {this.state.otherUnit}
                />
            </div>
        </div>
    );
  }
}

export default App;




