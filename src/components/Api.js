import React from 'react';
import useApiData from '../hooks/useApiData';
import ApiDisplay from './ApiDisplay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Api = () => {
  const { data, isLoading, error } = useApiData();

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>
        API Data
      </Typography>
      <ApiDisplay data={data} isLoading={isLoading} error={error} />
    </Paper>
  );
};

export default Api;