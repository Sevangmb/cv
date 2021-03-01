import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
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
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" />
        <Tab label="Plex" />
        <Tab label="Competences" />
        <Tab label="Experience" />
      </Tabs>
    </Paper>
  );
}
