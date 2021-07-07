import React from 'react';
import useTyped from 'use-typed';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    position: {
        position: 'fixed',
        padding: '250px 480px',
    },
}));

const Installation = () => {

    const classes = useStyles();
    const instruction = React.useRef(null);

    useTyped(instruction, {
        strings: ["$ npm install cool-guy !\n",
                  "$ npm add sevan ^1000\n",
                  "$ "],
        cursorChar: '_',
        typeSpeed: 100,
        backSpeed: 0,
    });

    return (
        <div className={classes.position}>
            <code ref={instruction} />
        </div>
    );

};

export default Installation;
