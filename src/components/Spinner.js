import React, { Component } from 'react'
import spinner from './spinner.gif';

export class Spinner extends Component {
    render() {
        return (
            <div className="text-center my-3">
                <img src={spinner} alt="spinner" />
            </div>
        )
    }
}

export default Spinner
