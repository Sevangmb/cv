import React from 'react';
import PropTypes from 'prop-types';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import WorkIcon from '@material-ui/icons/Work';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logos from './logos';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 1200,
		margin: '0 auto',
		padding: theme.spacing(4, 2),
		overflowX: 'hidden',
	},
	heading: {
		color: theme.palette.primary.main,
		marginBottom: theme.spacing(2),
	},
	timeline: {
		padding: 0,
	},
	// Sur écran étroit, la colonne d'en face disparaît : l'entreprise passe dans la carte.
	narrowItem: {
		'&:before': {
			display: 'none',
		},
	},
	company: {
		marginBottom: theme.spacing(1),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		marginBottom: theme.spacing(1),
	},
	roleTitle: {
		fontWeight: 600,
	},
	meta: {
		color: theme.palette.text.secondary,
	},
	details: {
		margin: theme.spacing(1, 0, 0),
		paddingLeft: theme.spacing(2.5),
	},
	logo: {
		maxHeight: 48,
		maxWidth: 180,
		objectFit: 'contain',
		background: '#fff',
		padding: '6px 10px',
		borderRadius: 6,
		marginBottom: 6,
		display: 'inline-block',
	},
}));

const Company = ({ experience, classes }) => (
	<div className={classes.company}>
		{logos[experience.logo] && (
			<a href={experience.url || undefined} target="_blank" rel="noopener noreferrer">
				<img className={classes.logo}
					style={experience.logoBg ? { background: experience.logoBg } : undefined}
					src={logos[experience.logo]} alt={experience.companyName} />
			</a>
		)}
		<Typography variant="subtitle1" component="h2">{experience.companyName}</Typography>
		<Typography variant="body2" color="textSecondary">{experience.about}</Typography>
	</div>
);

const Role = ({ role, classes }) => (
	<Paper className={classes.paper}>
		<Typography variant="h6" component="h3" className={classes.roleTitle}>{role.title}</Typography>
		<Typography variant="body2" className={classes.meta}>
			{role.startDate} – {role.endDate} · {role.location}
		</Typography>
		<Typography variant="body2" component="p" style={{ marginTop: 8 }}>{role.description}</Typography>
		{role.details && (
			<ul className={classes.details}>
				{role.details.map((detail, j) => (
					<li key={`detail-${j}`}><Typography variant="body2" component="span">{detail}</Typography></li>
				))}
			</ul>
		)}
	</Paper>
);

const Exemple2 = ({ title, experiences }) => {
	const classes = useStyles();
	const theme = useTheme();
	const narrow = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className={classes.root}>
			<Typography variant="h4" component="h1" className={classes.heading}>{title}</Typography>
			<Timeline align={narrow ? 'left' : 'alternate'} className={classes.timeline}>
				{experiences.map((experience, i) => (
					<TimelineItem key={`experience-${i}`} className={narrow ? classes.narrowItem : undefined}>
						{!narrow && (
							<TimelineOppositeContent>
								<Company experience={experience} classes={classes} />
							</TimelineOppositeContent>
						)}
						<TimelineSeparator>
							<TimelineDot color="secondary">
								<WorkIcon />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							{narrow && <Company experience={experience} classes={classes} />}
							{experience.roles.map((role, j) => (
								<Role key={`role-${j}`} role={role} classes={classes} />
							))}
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	);
};

Exemple2.defaultProps = {
	title: '',
};
Exemple2.propTypes = {
	title: PropTypes.string,
	experiences: PropTypes.arrayOf(
		PropTypes.shape({
			companyName: PropTypes.string,
			logo: PropTypes.string,
			logoBg: PropTypes.string,
			about: PropTypes.string,
			url: PropTypes.string,
			roles: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					description: PropTypes.string,
					details: PropTypes.arrayOf(PropTypes.string),
					startDate: PropTypes.string,
					endDate: PropTypes.string,
					location: PropTypes.string,
				})
			),
		}),
	).isRequired,
};

export default Exemple2;
