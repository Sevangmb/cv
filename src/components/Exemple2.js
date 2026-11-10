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
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logos from './logos';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	  },
	paper: {
	  padding: '16px',
	  palette: {
		primary: {
		  main: '#0A6873',
		},
		secondary: {
		  main: '#D9933D',
		},
	  },
	},
	details: {
		textAlign: 'left',
		paddingLeft: '20px',
		margin: 0,
	},
	logo: {
		maxHeight: '48px',
		maxWidth: '180px',
		objectFit: 'contain',
		background: '#fff',
		padding: '6px 10px',
		borderRadius: '6px',
		marginBottom: '6px',
	},
	secondaryTail: {
	  backgroundColor: theme.palette.secondary.main,
	},
  }));

const Exemple2 = ({ title, experiences }) => {
	const classes = useStyles();

	return (
		<Timeline align="alternate">
			<Typography variant="h1">{title}</Typography>
			{experiences.map((experience, i) => (
				<TimelineItem key={`experience-${i}`}>
					<TimelineOppositeContent>
							{logos[experience.logo] && (
								<a href={experience.url || undefined} target="_blank" rel="noopener noreferrer">
									<img className={classes.logo} style={experience.logoBg ? { background: experience.logoBg } : undefined} src={logos[experience.logo]} alt={experience.companyName} />
								</a>
							)}
							<Typography variant="subtitle1" color="textPrimary">
								{experience.companyName}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{experience.about}
							</Typography>
						</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot color="secondary">
							<WorkIcon />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					{experience.roles.map((role, i) => ( 
						<TimelineContent key={`role-${i}`}>
							<Paper className={classes.paper}>
								<Grid item xs={12}>
									<Typography variant="h6" component="h1">
									{role.title}
									</ Typography>
									<span>{role.startDate} ></span>
									<span> {role.endDate}</span> 
									<br /><span>{role.location}</span>
									<p>{role.description}</p>
									{role.details && (
										<ul className={classes.details}>
											{role.details.map((detail, j) => <li key={`detail-${j}`}>{detail}</li>)}
										</ul>
									)}
								</Grid>
							</Paper>
						</TimelineContent>
					))}
				</TimelineItem>
			))}
		</Timeline>
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
			about: PropTypes.string,
			logoBg: PropTypes.string,
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