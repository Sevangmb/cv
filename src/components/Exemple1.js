import React from 'react';
import data from '../data';
import { makeStyles } from '@material-ui/core/styles';
import LinkedIn from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

const icons = {
    linkedin: LinkedIn,
    github: GitHubIcon,
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(2),
        padding: theme.spacing(2, 0, 5),
    },
}));

const Exemple1 = () => {
    const classes = useStyles();
    return (
        <nav className={classes.root} aria-label="Réseaux">
            {data.SocialMedias.filter(media => icons[media.icon]).map(media => (
                <IconButton key={media.icon} size="medium" color="primary" href={media.url}
                    target="_blank" rel="noopener noreferrer" aria-label={media.icon}>
                    {React.createElement(icons[media.icon], { style: { fontSize: 48 } })}
                </IconButton>
            ))}
        </nav>
    );
};

export default Exemple1;
