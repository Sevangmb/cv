import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Me from '../img/me.png';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginTop: theme.spacing(1),
        paddingTop: 50,
    },
    stripe: {
        width: '100%',
    },
    second: {
        backgroundColor: theme.palette.secondary.main,
        height: '12px',
    },
    fourth: {
        backgroundColor: '#ea907a',
        height: '25px',
    },
    first: {
        backgroundColor: theme.palette.primary.main,
        height: '50px',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 50,
        width: 145,
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            left: '50%',
            transform: 'translateX(-50%)',
            width: 110,
        },
    },
    spacer: {
        height: 90,
        [theme.breakpoints.down('xs')]: {
            height: 60,
        },
    },
}));

const Bandeau = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={`${classes.stripe} ${classes.second}`} />
            <div className={`${classes.stripe} ${classes.fourth}`} />
            <div className={`${classes.stripe} ${classes.first}`} />
            <img className={classes.image} src={Me} alt="Sevan Safarian" />
            <div className={classes.spacer} />
        </div>
    );
};

export default Bandeau;
