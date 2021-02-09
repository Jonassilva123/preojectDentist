import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Profile from './Profile';
import Response from './Response';
import Tusks from './Tusks';

import { useProfile } from './contextProfile';

function Results({ client, id }) {
  const { setId } = useProfile();
  function getId() {
    return setId(id);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getId();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={6} xs={12}>
        <Profile />
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Response />
      </Grid>
      <Grid item xs={12}>
        <Tusks />
      </Grid>
    </Grid>
  );
}

export default Results;
