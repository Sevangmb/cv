import React from 'react';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // For loading state
import Alert from '@mui/material/Alert'; // For error state

/**
 * ApiDisplay is a presentational component responsible for rendering data fetched from an API.
 * It handles displaying loading indicators, error messages, and the data itself.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>|null} props.data - The data to be displayed. Expected to be an array of items, each with at least `_id` and `name` properties. Null if data is not yet loaded or an error occurred.
 * @param {boolean} props.isLoading - Flag indicating if the data is currently being loaded.
 * @param {Error|null} props.error - An error object if an error occurred during data fetching, otherwise null.
 */
const ApiDisplay = ({ data, isLoading, error }) => {
  // Display a loading spinner if data is currently being fetched.
  if (isLoading) {
    return <CircularProgress />;
  }

  // Display an error message if an error occurred during fetching.
  if (error) {
    return <Alert severity="error">Error fetching data: {error.message}</Alert>;
  }

  // Display a message if no data is available (e.g., empty array or null after loading).
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  // Render the data using Material-UI Chip components.
  return (
    <Stack direction="row" spacing={1}>
      {data.map((item) => (
  }

        <Chip
          icon={<FaceIcon />}
          label={item.name} // Assuming each item has a 'name' property for the Chip label.
          variant="outlined"
          key={item._id} // Assuming each item has an '_id' property for the key.
        />
      ))}
    </Stack>
  );
};

export default ApiDisplay;
