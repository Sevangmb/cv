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

const Exemple2 = ({ title, experiences }) => {
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

Exemple2.defaultProps = {
	title: '',
};
Exemple2.propTypes = {
	title: PropTypes.string,
	experiences: PropTypes.arrayOf(
		PropTypes.shape({
			companyName: PropTypes.string,
			logo: PropTypes.string,
			url: PropTypes.string,
			roles: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					description: PropTypes.string,
					startDate: PropTypes.string,
					endDate: PropTypes.string,
					location: PropTypes.string,
				})
		  	),
		}),
	).isRequired,
};

export default Exemple2;