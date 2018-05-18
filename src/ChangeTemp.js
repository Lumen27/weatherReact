import React from 'react'

export const ChangeTemp = props => {
        return <button onClick={props.onClick}>Change to {props.otherUnit}</button>
    };
