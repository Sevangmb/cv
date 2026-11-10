import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import ComputerIcon from '@material-ui/icons/Computer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SchoolIcon from '@material-ui/icons/School';
import Item from './Item';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: theme.spacing(4, 2),
    overflowX: 'hidden',
  },
  heading: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
}));

const cards = [
  {
    icon: AccountBalanceIcon,
    title: 'Logiciels de gestion',
    content: 'Support, paramétrage, migration et formation sur les logiciels de gestion et de comptabilité : Odoo, Sage (certifié Batigest SQL), EBP (certifié), Codial.',
  },
  {
    icon: HeadsetMicIcon,
    title: 'Support',
    content: 'Traitement des tickets, diagnostic et dépannage, suivi des dossiers clients, hotline (Bell Sympatico à Montréal), formation des utilisateurs.',
  },
  {
    icon: StorefrontIcon,
    title: 'Commerce',
    content: 'Portefeuille clients (grands comptes et artisans), devis et chiffrages, suivi des commandes fournisseurs et clients, litiges et SAV, réceptions et stock.',
  },
  {
    icon: ComputerIcon,
    title: 'Informatique',
    content: 'Linux (Debian), Windows, macOS. Docker, sauvegardes ZFS, intégration continue. SQL, JavaScript/React, Python, PHP.',
  },
  {
    icon: SchoolIcon,
    title: 'Formation',
    content: 'Vingt ans de formation d\'adultes : utilisateurs de logiciels de gestion, particuliers, mairies, offices du tourisme, PME.',
  },
  {
    icon: EmojiObjectsIcon,
    title: 'Projets personnels',
    content: 'Fring (fring.sevan.zone), application de garde-robe avec IA, et un serveur auto-hébergé : Docker, photos, documents, médias, sauvegardes.',
  },
];

const Competences = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.heading}>
        Compétences
      </Typography>
      <Grid container spacing={3}>
        {cards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Item {...card} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Competences;
