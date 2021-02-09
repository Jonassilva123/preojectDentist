import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useProfile } from './contextProfile';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { client, id } = useProfile();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <IconButton href={`/app/customers/profile/settings/${id}`}>
            <EditIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${client.firstName} ${client.lastName} - ${client.document}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`Nascimento: ${client.birth} - ${moment().diff(
              client.birth,
              'years'
            )} anos de idade`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`Pai: ${client.father}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`Mãe: ${client.mother} `}
          </Typography>

          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`Telefones: ${client.phoneOne} / ${client.phoneTwo} `}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
