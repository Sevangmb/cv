import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import GetAppIcon from '@material-ui/icons/GetApp';
import Bandeau from './bandeau';
import Lpage from '../img/Lpage.png';
import Text from './Text';
import data from '../data';

const useStyles = makeStyles(theme => ({
    hero: {
        maxWidth: 1100,
        margin: '0 auto',
        padding: theme.spacing(4, 2, 6),
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            textAlign: 'center',
            paddingTop: theme.spacing(2),
        },
    },
    intro: {
        flex: '1 1 380px',
        [theme.breakpoints.down('sm')]: {
            flex: '0 0 auto',
        },
    },
    name: {
        fontWeight: 700,
        color: theme.palette.primary.main,
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.2rem',
        },
    },
    role: {
        margin: theme.spacing(1, 0, 2),
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(1.5),
        flexWrap: 'wrap',
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    illustration: {
        flex: '1 1 460px',
        [theme.breakpoints.down('sm')]: {
            flex: '0 0 auto',
        },
        position: 'relative',
        maxWidth: 560,
        width: '100%',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    tv: {
        display: 'block',
        width: '100%',
        borderRadius: 12,
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    hint: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
        fontFamily: 'monospace',
    },
    stats: {
        maxWidth: 1100,
        margin: '0 auto',
        padding: theme.spacing(0, 2, 4),
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
    stat: {
        borderLeft: `6px solid ${theme.palette.secondary.main}`,
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: 6,
    },
    statValue: {
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
}));

const Home = ({ onNavigate, onOpenTerminal, pdfUrl }) => {
    const classes = useStyles();
    const linkedin = data.SocialMedias.find(m => m.icon === 'linkedin');
    return (
        <React.Fragment>
            <Bandeau />
            <section className={classes.hero}>
                <div className={classes.intro}>
                    <Typography variant="h2" component="h1" className={classes.name}>
                        Sevan Safarian
                    </Typography>
                    <Typography variant="h5" component="p" className={classes.role}>
                        Chargé support logiciel · ERP Odoo, Sage, EBP
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Bonjour ! Je suis chargé support logiciel chez Herbarom, à Valence, où j'accompagne
                        les équipes sur l'ERP Odoo. Avant cela, j'ai formé et dépanné pendant des années les
                        utilisateurs de Sage et d'EBP, après dix ans de relation client et de vente technique
                        chez Brossette et Téréva, et trois ans de hotline à Montréal.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" style={{ marginTop: 12 }}>
                        Ce qui me plaît : rendre l'informatique simple pour ceux qui l'utilisent. Le soir,
                        je bricole mon propre serveur et Fring, une application de garde-robe avec IA.
                    </Typography>
                    <div className={classes.actions}>
                        <Button variant="contained" color="primary" onClick={() => onNavigate(2)}>
                            Voir mon parcours
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => onNavigate(1)}>
                            Mes compétences
                        </Button>
                        <Button variant="outlined" color="primary" startIcon={<GetAppIcon />} href={pdfUrl} target="_blank" rel="noopener noreferrer">
                            CV en PDF
                        </Button>
                        {linkedin && (
                            <Button color="primary" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </Button>
                        )}
                    </div>
                </div>
                <div className={classes.illustration}>
                    <ButtonBase className={classes.tv} onClick={onOpenTerminal} focusRipple
                        aria-label="Ouvrir le terminal" title="Ouvrir le terminal">
                        <img className={classes.image} src={Lpage} alt="" />
                        <Text />
                    </ButtonBase>
                    <Typography variant="body2" color="textSecondary" className={classes.hint}>
                        ▲ cliquez sur la télé pour ouvrir le terminal
                    </Typography>
                </div>
            </section>
            <section className={classes.stats} aria-label="En chiffres">
                {data.Stats.map(stat => (
                    <div className={classes.stat} key={stat.value}>
                        <Typography variant="h5" component="p" className={classes.statValue}>{stat.value}</Typography>
                        <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
                    </div>
                ))}
            </section>
        </React.Fragment>
    );
};

export default Home;
