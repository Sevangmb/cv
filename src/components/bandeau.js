import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Me from '../img/me.png';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '1px',
    },
    size: {
        width: '100%',
    },
    first: {
        backgroundColor: theme.palette.primary.main,
        height: '50px',
    },
    second: {
      backgroundColor: theme.palette.secondary.main,
      height: '12px',
    },
    third: {
        backgroundColor: theme.palette.background.default,
        height: '50px',
    },
    fourth: {
        backgroundColor: '#ea907a',
        height: '25px',
    },
    image: {
        position: 'fixed',
        padding: '0px 50px',
    },
  }));

const Bandeau = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <img className={classes.image} src={Me} alt='Me'/>
            <div>
                <div className={`${classes.third} ${classes.size}`} />
                <div className={`${classes.second} ${classes.size}`} />
                <div className={`${classes.fourth} ${classes.size}`} />
                <div className={`${classes.first} ${classes.size}`} />
            </div>
        </div>
    );
};

export default Bandeau;
