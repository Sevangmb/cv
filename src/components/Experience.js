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
	secondaryTail: {
	  backgroundColor: theme.palette.secondary.main,
	},
  }));

/**
 * @typedef {object} Role
 * @property {string} title - The title of the role.
 * @property {string} description - A description of the role and responsibilities.
 * @property {string} startDate - The start date of the role.
 * @property {string} endDate - The end date of the role.
 * @property {string} location - The location of the role.
 */

/**
 * @typedef {object} ExperienceEntry
 * @property {string} companyName - The name of the company.
 * @property {string} logo - URL or path to the company logo.
 * @property {string} url - URL to the company website.
 * @property {Array<Role>} roles - An array of roles held at the company.
 */

/**
 * Experience component displays a timeline of professional experiences.
 * It takes a title and a list of experience entries to render.
 * @param {object} props - The component's props.
 * @param {string} props.title - The title to be displayed above the timeline.
 * @param {Array<ExperienceEntry>} props.experiences - An array of experience objects to display.
 */
const Experience = ({ title, experiences }) => {
	const classes = useStyles();

	return (
		<Timeline align="alternate">
			<Typography variant="h1">{title}</Typography>
			{experiences.map((experience, i) => (
				<TimelineItem key={`experience-${i}`}>
					<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
							<span>{experience.companyName}</span>
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
								</Grid>
							</Paper>
						</TimelineContent>
					))}
				</TimelineItem>
			))}
		</Timeline>
	);
};

Experience.defaultProps = {
	title: '',
};

Experience.propTypes = {
	/** The title to be displayed above the timeline. */
	title: PropTypes.string,
	/** An array of experience objects to display in the timeline. */
	experiences: PropTypes.arrayOf(
		PropTypes.shape({
			/** The name of the company. */
			companyName: PropTypes.string,
			/** URL or path to the company logo. */
			logo: PropTypes.string,
			/** URL to the company website. */
			url: PropTypes.string,
			/** An array of roles held at the company. */
			roles: PropTypes.arrayOf(
				PropTypes.shape({
					/** The title of the role. */
					title: PropTypes.string,
					/** A description of the role and responsibilities. */
					description: PropTypes.string,
					/** The start date of the role. */
					startDate: PropTypes.string,
					/** The end date of the role. */
					endDate: PropTypes.string,
					/** The location of the role. */
					location: PropTypes.string,
				})
		  	),
		}),
	).isRequired,
};

export default Experience;