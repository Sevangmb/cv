import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  // Sur téléphone, les quatre onglets doivent tenir sur une ligne sans défilement.
  tabs: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiTab-root': {
        minWidth: 0,
        padding: '6px 6px',
        fontSize: '0.72rem',
        flex: 1,
      },
    },
  },
  paper: {
      boxShadow: 'none',
      background: theme.palette.background.default,
  },
}));

export default function CenteredTabs({ current, onChange }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    if (onChange) {
        onChange(event, newValue);
    }
};

  return (
    <Paper className={classes.paper}>
      <Tabs
        className={classes.tabs}
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Accueil" />
        <Tab label="Compétences" />
        <Tab label="Parcours" />
        <Tab label="CV" />
      </Tabs>
    </Paper>
  );
}
