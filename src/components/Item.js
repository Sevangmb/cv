import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  band: {
    background: theme.palette.primary.main,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 96,
    '& svg': {
      fontSize: 48,
    },
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const Item = ({ icon: Icon, title, content }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.band} aria-hidden="true">
        {Icon && <Icon />}
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

Item.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Item;
