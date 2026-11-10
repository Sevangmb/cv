import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import data from '../data';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: theme.spacing(4, 2, 2),
    overflowX: 'hidden',
  },
  heading: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(3),
    height: '100%',
  },
  area: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  list: {
    margin: 0,
    paddingLeft: theme.spacing(2.5),
    '& li': {
      marginBottom: theme.spacing(0.5),
    },
  },
}));

const Exemple3 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.heading}>
        CV en bref
      </Typography>
      <Grid container spacing={3}>
        {data.Skills.map(skill => (
          <Grid item xs={12} sm={6} md={4} key={skill.Area}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h6" component="h2" className={classes.area}>{skill.Area}</Typography>
              <ul className={classes.list}>
                {skill.SkillSet.map(detail => (
                  <li key={detail.Name}>
                    <Typography variant="body2" component="span">{detail.Name}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Exemple3;
