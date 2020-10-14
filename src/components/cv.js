import React, { Component } from 'react';
import Exemple2 from './Exemple2';
import Exemple2 from './Exemple3';
import Exemple2 from './Exemple1';
 
class Cv extends Component {
    render() {
        return (
            <div className="Cv">
				<Exemple2 />
				<Exemple3 />
				<Exemple1 />
            </div>
        );
    }
}
 
export default Cv;
