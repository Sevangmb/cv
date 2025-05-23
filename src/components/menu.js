import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function CenteredTabs({ current, onChange }) {
  const handleChange = (event, newValue) => {
    if (onChange) {
        onChange(event, newValue);
    }
};

  return (
    <Paper sx={{
      boxShadow: 'none',
      background: (theme) => theme.palette.background.default,
    }}>
      <Tabs
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" />
        <Tab label="Competences" />
        <Tab label="Experience" />
        <Tab label="Cv" />
        <Tab label="Pedroflix" />
      </Tabs>
    </Paper>
  );
}
