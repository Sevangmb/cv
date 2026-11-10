import React from 'react';
import useTyped from 'use-typed';
import { makeStyles } from '@material-ui/core/styles';

// Le texte s'affiche dans l'écran du téléviseur de l'illustration : sa position est donnée
// en pourcentage de l'image, pour suivre l'illustration quelle que soit sa taille.
const useStyles = makeStyles(() => ({
    screen: {
        position: 'absolute',
        left: '40.5%',
        top: '32.5%',
        width: '17%',
        color: '#f4f6ff',
        fontSize: 'clamp(6px, 0.8vw, 11px)', lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
    },
}));

const Installation = () => {
    const classes = useStyles();
    const instruction = React.useRef(null);

    useTyped(instruction, {
        strings: ["$ npm i sevan\n", "$ sevan --odoo\n", "$ "],
        cursorChar: '_',
        typeSpeed: 90,
        backSpeed: 0,
    });

    return (
        <div className={classes.screen} aria-hidden="true">
            <code ref={instruction} />
        </div>
    );
};

export default Installation;
