import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles';
import { sixth } from '../contentData';

class Sixth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sixthWeekHandleChange = this.sixthWeekHandleChange.bind(this);
  }

  sixthWeekHandleChange(event) {
    this.props.handleChangeState('sixth', event.target.name, event.target.value);
  }

  render() {
    const { classes, handleClickOpen, data } = this.props;
    const { injury, health } = data;
    const error = injury === '';
    return (
      <Grid container style={{ height: '100%' }} direction="column" justify="space-around" alignItems="center">

        <Grid container style={{ height: '17%' }} justify="center" alignItems="center">
          <Typography variant="h5" component="h5" color="textPrimary">Health and Wellbeing</Typography>
        </Grid>

        <Grid container className={classes.topGrid} style={{ width: '100%', margin: '0' }} spacing={40} justify="center" alignContent="flex-start" alignItems="flex-start">
          <Grid item xs={12} style={{ paddingTop: '0' }}>
            <FormControl required className={classes.formControl} error={error} component="fieldset">
              <Typography variant="body1" component="h6" color="textPrimary"> Do you experience injury or posture related pain at work?</Typography>
              <FormGroup>
                {sixth.injury.map(v => (
                  <FormControlLabel
                    style={{ justifyContent: 'space-between' }}
                    labelPlacement="start"
                    onClick={() => handleClickOpen({ discription: v.describe || '', title: v.title })}
                    key={v.id}
                    name="injury"
                    control={
                      <Checkbox color="primary" checked={injury === `${v.id}`} onChange={this.sixthWeekHandleChange} value={`${v.id}`} />
                    }
                    label={v.title}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0' }}>
            <FormControl required className={classes.formControl} error={error} component="fieldset">
              <Typography variant="body1" component="h6" color="textPrimary"> How do you feel your health and wellbeing is right now?</Typography>
              <FormGroup>
                {sixth.health.map(v => (
                  <FormControlLabel
                    style={{ justifyContent: 'space-between' }}
                    labelPlacement="start"
                    key={v.id}
                    name="health"
                    onClick={() => handleClickOpen({ discription: v.describe, title: v.title })}
                    control={
                      <Checkbox color="primary" checked={health === `${v.id}`} onChange={this.sixthWeekHandleChange} value={`${v.id}`} />
                    }
                    label={v.title}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

Sixth.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sixth);
