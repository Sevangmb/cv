import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: 'none',
    background: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  tabs: {
    flex: 1,
    minWidth: 0,
    [theme.breakpoints.down('xs')]: {
      '& .MuiTab-root': {
        minWidth: 0,
        padding: '6px 10px',
        fontSize: '0.75rem',
      },
    },
  },
  toggle: {
    marginRight: theme.spacing(1),
  },
}));

export default function CenteredTabs({ current, onChange, dark, onToggleDark }) {
  const classes = useStyles();
  const theme = useTheme();
  // Sur téléphone, cinq onglets ne tiennent pas côte à côte : la barre défile au doigt.
  const narrow = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Paper className={classes.paper} square>
      <Tabs
        className={classes.tabs}
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered={!narrow}
        variant={narrow ? 'scrollable' : 'standard'}
        scrollButtons="off"
      >
        <Tab label="Accueil" />
        <Tab label="Compétences" />
        <Tab label="Parcours" />
        <Tab label="Projets" />
        <Tab label="CV" />
      </Tabs>
      <IconButton className={classes.toggle} size="small" onClick={onToggleDark}
        aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
        title={dark ? 'Mode clair' : 'Mode sombre'}>
        {dark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Paper>
  );
}
