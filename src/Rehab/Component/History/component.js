import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FeedbackIcon from '@material-ui/icons/Feedback';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import { styles } from '../../styles';

const iconDisplay = (finish) => {
  switch (finish) {
    case true:
      return <FeedbackIcon />;
    default:
      return <RightIcon />;
  }
};

class History extends React.PureComponent {
  render() {
    const { classes, days, finish } = this.props;
    return (
      <List className={classes.root} component="nav" disablePadding>
        {
            [...Array(days || 5)].map((v, k) => (
              <ListItem className={classes.infoListItem} key={k} component={Paper} divider elevation={4}>
                <ListItemText primary={(
                  <Typography variant="body1" color="secondary">{`Day ${k + 1}`}</Typography>)}
                />
                <ListItemIcon>{iconDisplay(finish)}</ListItemIcon>
              </ListItem>
            ))
        }
      </List>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
  days: PropTypes.number,
  finish: PropTypes.bool,
};

export default withStyles(styles)(History);
