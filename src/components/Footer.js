import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        borderTop: `4px solid ${theme.palette.secondary.main}`,
        marginTop: theme.spacing(4),
        padding: theme.spacing(3, 2),
        textAlign: 'center',
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Typography variant="body2" color="textSecondary">
                Site construit en React à partir du code de mon dépôt GitHub{' '}
                <Link underline="always" href="https://github.com/Sevangmb/cv" target="_blank" rel="noopener noreferrer">Sevangmb/cv</Link>,
                hébergé à l'origine sur{' '}
                <Link underline="always" href="https://sevangmb.github.io/cv/" target="_blank" rel="noopener noreferrer">GitHub Pages</Link>,
                et aujourd'hui sur mon propre serveur.
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" style={{ marginTop: 6 }}>
                Fabriqué avec React et Material UI · servi par nginx derrière Traefik, sur un serveur Debian à Valence ·
                essayez la télé de l'accueil, elle cache un terminal.
            </Typography>
        </footer>
    );
};

export default Footer;
