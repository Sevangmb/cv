import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Bandeau from './bandeau';
import Lpage from '../img/Lpage.png';
import Text from './Text';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        position: 'fixed',
        padding: '0px 50px',
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Bandeau />
            <div className={classes.imageContainer}>
                <img src={Lpage} alt='Lpage'/>
            </div>
            <Text />
        </React.Fragment>
 
    );
};

export default Home;