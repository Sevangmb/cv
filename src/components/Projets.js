import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import data from '../data';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: theme.spacing(4, 2),
        overflowX: 'hidden',
    },
    heading: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    intro: {
        marginBottom: theme.spacing(3),
        maxWidth: 760,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderTop: `6px solid ${theme.palette.secondary.main}`,
    },
    content: {
        flexGrow: 1,
    },
    name: {
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: theme.spacing(1.5),
    },
}));

const Projets = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h1" className={classes.heading}>Projets</Typography>
            <Typography variant="body1" color="textSecondary" className={classes.intro}>
                Ce que je construis en dehors du travail, pour le plaisir d'apprendre et parce que
                c'est la meilleure façon de comprendre les outils que j'accompagne au quotidien.
            </Typography>
            <Grid container spacing={3}>
                {data.Projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.name}>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <Typography variant="h6" component="h2" className={classes.name}>{project.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{project.description}</Typography>
                                <div className={classes.tags}>
                                    {project.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                                </div>
                            </CardContent>
                            {project.url && (
                                <CardActions>
                                    <Button size="small" color="primary" href={project.url} target="_blank" rel="noopener noreferrer">
                                        Voir le site
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Projets;
