import { useState, useEffect } from 'react';

/**
 * @typedef {object} ApiData
 * @property {Array<object>|null} data - The data fetched from the API. Null if no data has been fetched or if an error occurred.
 * @property {boolean} isLoading - True if the data is currently being fetched, false otherwise.
 * @property {Error|null} error - An error object if an error occurred during fetching, null otherwise.
 */

/**
 * Custom hook to fetch data from the MongoDB Realm webhook.
 * It manages loading and error states internally.
 * @returns {ApiData} An object containing the fetched data, loading state, and error state.
 */
const useApiData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true before fetching
      setError(null); // Reset error state
      try {
        // Fetch data from the API
        const response = await fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/cv-xfzvw/service/cv/incoming_webhook/api?secret=cv');
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const result = await response.json();
        // Set the fetched data
        setData(result);
      } catch (e) {
        // Set error state if an error occurs
        setError(e);
      } finally {
        // Set loading state to false after fetching (whether successful or not)
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once on mount

  return { data, isLoading, error };
};

export default useApiData;
