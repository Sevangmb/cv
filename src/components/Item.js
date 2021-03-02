import React from 'react'
import { Card,
         CardActionArea,
         CardMedia,
         CardContent,
         Typography,
         CardActions,
         Button }     from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Badge from "react-shields-badge";
import "react-shields-badge/dist/react-shields-badge.css";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    width: 345,
  },
  media: {
    height: 140,
  },
  title: {
    color: theme.palette.primary.main
  }
}))

<<<<<<< HEAD
const Item = ({ image, title, link, content, badge }) => {
=======
const Item = ({ image, title, content, badge }) => {
>>>>>>> 549bdf5aeebddc3cfe8c7cbe2ca43007fce46308
  const classes = useStyles()
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
<<<<<<< HEAD
          link={link}
=======
>>>>>>> 549bdf5aeebddc3cfe8c7cbe2ca43007fce46308
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={title}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
          {badge && <Badge data={[badge.name, badge.version]} backgroundColor={[badge.bgleft, badge.bgright]} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
<<<<<<< HEAD
        <Button size="small" color="primary" href={link}>
=======
        <Button size="small" color="primary" href="#">
>>>>>>> 549bdf5aeebddc3cfe8c7cbe2ca43007fce46308
          En savoir plus !
        </Button>
      </CardActions>
    </Card>
  )
}

Item.defaultProps = {
  title: 'Wow',
  content: 'It s amazing !',
  image: 'https://pixabay.com/images/id-5424776/',
};

Item.propTypes = {
	title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
<<<<<<< HEAD
  link: PropTypes.string.isRequired,
=======
>>>>>>> 549bdf5aeebddc3cfe8c7cbe2ca43007fce46308
  badge: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string,
    bgleft: PropTypes.string,
    bgright: PropTypes.string,
  }),
};

export default Item