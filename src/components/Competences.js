import Item from './Item';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
  padding: theme.spacing(2),
  },
}));

const Competences = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item
            title="Logiciels de gestion"
            content="Support, paramétrage, migration et formation sur les logiciels de gestion et de comptabilité : Odoo, Sage, EBP, Codial."
            image="https://media.istockphoto.com/photos/double-explosure-with-businesss-charts-of-graph-and-rows-of-coins-for-picture-id1051617040"
          />
        </Grid>
        <Grid item xs>
          <Item
            title="Commerce"
            content="Gestion de portefeuille clients, suivi de commandes fournisseurs/clients, devis, suivi des litiges/SAV, gestion des réceptions/livraisons et de stock. "
            image="https://media.istockphoto.com/photos/glad-to-work-with-you-picture-id951514270"
          />
        </Grid>
        <Grid item xs>
          <Item
            title="Support"
            content="Traitement des tickets, diagnostic et dépannage, suivi des dossiers clients, formation des utilisateurs."
            image="https://image.shutterstock.com/image-photo/smiling-friendly-female-callcenter-agent-600w-1175066677.jpg"
          />
        </Grid>
        <Grid item xs>
          <Item
            title="Informatique"
            content="Linux (Debian), Windows, macOS. Docker, sauvegardes ZFS, intégration continue. SQL, JavaScript/React, Python."
            image="https://as1.ftcdn.net/jpg/02/25/56/76/500_F_225567663_gPfQuBNATBPkZO8KEGl256xPqURL6cbd.jpg"
          />
        </Grid>
        <Grid item xs>
          <Item
            title="Projets personnels"
            content="Fring (fring.sevan.zone), application de garde-robe avec IA, et un serveur auto-hébergé : Docker, photos, documents, médias, sauvegardes."
            image="https://as1.ftcdn.net/jpg/02/97/41/58/500_F_297415844_RQplmtTHNTNBJC8Mo2NbIfmUo9J7B1FT.jpg"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Competences
