import React from 'react'
import './RenderContent.css'

export const RenderContent = props => {
        return (
            <div>
                <h1>{props.city}, {props.country}</h1>
                <p>{props.currentTemp}°{props.tempUnit}</p>
                <p>{props.condition}</p>
            </div>
        )
};
