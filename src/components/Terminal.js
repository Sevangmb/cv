import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import data from '../data';

// Terminal rétro qui s'ouvre en cliquant sur la télé de l'accueil. Les commandes répondent
// avec le contenu du CV, et certaines ouvrent directement l'onglet correspondant.
const useStyles = makeStyles(theme => ({
    paper: {
        background: '#13201f',
        color: '#ffcb74',
        border: '6px solid #ea907a',
        borderRadius: 18,
        width: '100%',
        maxWidth: 720,
        margin: theme.spacing(2),
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 4px 4px 16px',
        background: '#4f8a8b',
        color: '#f4f6ff',
        fontFamily: 'monospace',
    },
    screen: {
        fontFamily: '"Courier New", monospace',
        fontSize: 15,
        padding: theme.spacing(2),
        height: 380,
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        [theme.breakpoints.down('xs')]: {
            fontSize: 13,
            height: '60vh',
        },
    },
    line: {
        display: 'flex',
        gap: 8,
    },
    input: {
        flex: 1,
        background: 'transparent',
        border: 0,
        outline: 'none',
        color: '#f4f6ff',
        font: 'inherit',
    },
    command: {
        color: '#f4f6ff',
    },
}));

const TABS = { accueil: 0, competences: 1, parcours: 2, projets: 3, cv: 4 };

const linkedin = (data.SocialMedias.find(m => m.icon === 'linkedin') || {}).url;

const HELP = [
    'Commandes disponibles :',
    '  qui          qui suis-je ?',
    '  parcours     mes postes, du plus récent au plus ancien',
    '  competences  ce que je sais faire',
    '  projets      ce que je construis à côté',
    '  contact      comment me joindre',
    '  pdf          télécharger mon CV en PDF',
    '  stats        ma fiche de personnage',
    '  aller <onglet>  ouvrir un onglet (accueil, competences, parcours, projets, cv)',
    '  effacer      vider l’écran',
    '',
    'Vous pouvez aussi poser une question, par exemple :',
    '  « tu connais Sage ? », « tu parles anglais ? », « tu as le permis ? »',
].join('\n');

// Fiche de personnage façon jeu de rôle : un clin d'œil, pas une évaluation.
const STATS = [
    'SEVAN SAFARIAN — classe : Support / Formateur',
    'Expérience : 25 ans · Base : Valence (Drôme)',
    '',
    'Pédagogie       ██████████  10',
    'Patience        █████████░   9',
    'Relation client █████████░   9',
    'Odoo / Sage     ████████░░   8',
    'Linux / Docker  ███████░░░   7',
    'Anglais         ██████░░░░   6',
    '',
    'Objets : CACES 1-3-5, certifications Sage et EBP, un serveur maison.',
    'Pouvoir spécial : rappeler le client quand c’est réglé.',
].join('\n');

// Questions libres : on cherche des mots-clés et on répond à partir du CV.
const FAQ = [
    [/odoo/, 'Oui : je fais le support et le paramétrage d’Odoo chez Herbarom depuis 2023.'],
    [/sage|batigest|codial/, 'Oui : formation, installation et migration de Sage (certifié Batigest SQL), Sage 50c et Codial chez APE Conseil, de 2019 à 2021.'],
    [/ebp/, 'Oui : je suis certifié EBP, que j’ai installé, migré et enseigné chez APE Conseil puis Axess Online (2019-2023).'],
    [/anglais|english/, 'Oui : trois ans de hotline à Montréal, en anglais et en français, pour Bell Sympatico.'],
    [/permis|voiture|caces/, 'Permis B, et CACES 1, 3 et 5.'],
    [/\bou\b|habite|ville|valence|region/, 'Je vis à Valence, dans la Drôme.'],
    [/linux|docker|serveur|debian/, 'Oui : j’administre seul un serveur Debian avec Docker, ZFS et une intégration continue GitLab.'],
    [/formation|former|enseign/, 'C’est le fil rouge de mon parcours : vingt ans à former des adultes, des mairies de l’Ardèche aux utilisateurs d’ERP.'],
    [/diplome|etude|bts|bac/, 'Bac technologique puis niveau BTS en électrotechnique (1995-1999), complétés par des certifications Sage et EBP.'],
    [/contact|joindre|mail|telephone/, `Le plus simple : un message sur LinkedIn (${linkedin}).`],
];

const answer = (raw, actions) => {
    const cmd = raw.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (cmd === '') return '';
    if (cmd === 'aide' || cmd === 'help') return HELP;
    if (cmd === 'qui' || cmd === 'whoami') {
        return 'Sevan Safarian — chargé support logiciel (ERP Odoo, Sage, EBP) à Valence.\n'
            + 'Formateur, dépanneur, ancien commercial, et bricoleur de serveurs le soir.';
    }
    if (cmd === 'parcours') {
        return data.Experiences.map(e => e.roles.map(r =>
            `[${r.status === 'En cours' ? 'EN COURS' : 'RÉSOLU ✔'}] ${r.startDate} – ${r.endDate}  ${r.title} — ${e.companyName}`
        ).join('\n')).join('\n') + '\n\n(tapez « aller parcours » pour le détail)';
    }
    if (cmd === 'competences') {
        return data.Skills.map(s => `${s.Area} : ${s.SkillSet.map(k => k.Name).join(', ')}`).join('\n\n');
    }
    if (cmd === 'projets') {
        return data.Projects.map(p => `• ${p.name}${p.url ? ` (${p.url})` : ''}\n  ${p.description}`).join('\n');
    }
    if (cmd === 'contact') {
        return `LinkedIn : ${linkedin}\nGitHub : https://github.com/Sevangmb\n(le plus simple : un message sur LinkedIn)`;
    }
    if (cmd === 'pdf') {
        actions.pdf();
        return 'Téléchargement du CV en PDF…';
    }
    if (cmd === 'effacer' || cmd === 'clear') return null;
    if (cmd.startsWith('sudo')) return 'Bien essayé. Ici, on vérifie toujours trois fois avant d’effacer quoi que ce soit.';
    if (cmd === 'odoo') return 'Odoo est démarré. Un ticket ? Je m’en occupe.';
    if (cmd.startsWith('aller ')) {
        const tab = cmd.slice(6).trim();
        if (tab in TABS) {
            actions.go(TABS[tab]);
            return `Ouverture de l’onglet « ${tab} »…`;
        }
        return `Onglet inconnu : ${tab}`;
    }
    if (cmd === 'stats') return STATS;
    const faq = FAQ.find(([motif]) => motif.test(cmd));
    if (faq) return faq[1];
    return `Je n’ai pas compris « ${raw.trim()} ». Tapez « aide », ou posez une question sur mon parcours.`;
};

const WELCOME = 'Bienvenue sur le terminal de Sevan.\nTapez « aide » pour la liste des commandes.';

const Terminal = ({ open, onClose, onNavigate, pdfUrl }) => {
    const classes = useStyles();
    const [lines, setLines] = useState([{ text: WELCOME }]);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const screenRef = useRef(null);

    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [lines]);

    const actions = {
        go: tab => setTimeout(() => { onNavigate(tab); onClose(); }, 500),
        pdf: () => window.open(pdfUrl, '_blank', 'noopener'),
    };

    const submit = event => {
        event.preventDefault();
        const reply = answer(value, actions);
        if (reply === null) {
            setLines([]);
        } else {
            setLines(prev => [...prev, { command: value }, ...(reply ? [{ text: reply }] : [])]);
        }
        setValue('');
    };

    const focus = () => inputRef.current && inputRef.current.focus();

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}
            onEntered={focus} aria-labelledby="terminal-titre">
            <div className={classes.bar}>
                <span id="terminal-titre">sevan@cv:~</span>
                <IconButton size="small" onClick={onClose} aria-label="Fermer le terminal" style={{ color: '#f4f6ff' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
            <div className={classes.screen} ref={screenRef} onClick={focus}>
                {lines.map((line, i) => (
                    <div key={i}>
                        {line.command !== undefined
                            ? <span className={classes.command}>$ {line.command}</span>
                            : line.text}
                    </div>
                ))}
                <form className={classes.line} onSubmit={submit}>
                    <span className={classes.command}>$</span>
                    <input ref={inputRef} autoFocus className={classes.input} value={value}
                        onChange={e => setValue(e.target.value)}
                        aria-label="Commande" autoComplete="off" autoCapitalize="off" spellCheck="false" />
                </form>
            </div>
        </Dialog>
    );
};

export default Terminal;
