import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Exemple3 from './Exemple3';
import Exemple1 from './Exemple1';
 
const Cv = ({ pdfUrl }) => (
    <div className="Cv">
        <Exemple3 />
        <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Button variant="contained" color="primary" startIcon={<GetAppIcon />}
                href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Télécharger le CV en PDF
            </Button>
        </div>
        <Exemple1 />
    </div>
);

export default Cv;
