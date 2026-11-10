import React, { Component } from 'react';
import Exemple3 from './Exemple3';
import Exemple1 from './Exemple1';
 
class Cv extends Component {
    render() {
        return (
            <div className="Cv">
				<Exemple3 />
				<Exemple1 />
            </div>
        );
    }
}
 
export default Cv;
