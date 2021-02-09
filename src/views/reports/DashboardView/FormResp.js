import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDashboard } from './dashboardContext';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TasksProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  const { dataDashboardCount } = useDashboard();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Prontuários Respondidos
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {dataDashboardCount.formsCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <CheckCircleOutlineIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
