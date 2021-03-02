import Item from './Item';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ombi from '../img/ombi.png';
import plex from '../img/plex.png';
import thelounge from '../img/thelounge.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Plex = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item 
            title="Ombi" 
            content="Ombi te permet de faire des demandes Plex. Ca ne t'empeche pas de m'appeler ;)" 
            image={ombi}
            link="https://nl5025.dediseedbox.com:62816"
            badge={{
              name: 'Ombi',
              version: 'Latest',
              bgleft: '#5b5b5b',
              bgright: '#4cc61f',
            }}
          />
        </Grid>
        <Grid item xs>
          <Item 
            title="Plex " 
            content="Pedroflix, la seule VOD que tu aimes plus de votre maman !" 
            image={plex}
            badge={{
              name: 'Plex',
              version: 'Latest',
              bgleft: '#5b5b5b',
              bgright: '#0f80c0',
            }}
            
          />
        </Grid>
        <Grid item xs>
          <Item 
            title="Support" 
            content="Gestion des appels, call flow, suivi des dossiers client, traitement des tickets, 	diagnostique et dépannage. " 
            image="https://image.shutterstock.com/image-photo/smiling-friendly-female-callcenter-agent-600w-1175066677.jpg"
          />
        </Grid>
        <Grid item xs>
          <Item 
            title="The Lounge" 
            content="The lounge est un client irc web auto hébergé pour le monde modern." 
            image={thelounge}
            link="https://nl5025.dediseedbox.com:20704"
            badge={{
              name: 'Debian',
              version: 'v1.0.0',
              bgleft: '#5b5b5b',
              bgright: '#4cc61f',
            }}
          />
        </Grid>
        <Grid item xs>
          <Item 
            title="World of warcraft" 
            content="Chasseur lvl 120. Donjon, raid. Metiers : cuisine, peche travail du cuir et depessage au max !" 
            image="https://as1.ftcdn.net/jpg/02/97/41/58/500_F_297415844_RQplmtTHNTNBJC8Mo2NbIfmUo9J7B1FT.jpg"
            badge={{
              name: 'Chasseur',
              version: 'v120',
              bgleft: '#5b5b5b',
              bgright: '#4cc61f',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Plex