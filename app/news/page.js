"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        // This should be a GET request to your API route
        const response = await axios.get('/api/ai1');
        
        // Set the headlines state with the data from the API
        setHeadlines(response.data.headlines);
        setLoading(false);
      } catch (err) {
        setError('Error fetching headlines');
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Headlines</h2>
      <ul>
        {headlines.map((headline, idx) => (
          <li key={idx}>{headline}</li>
        ))}
      </ul>
    </div>
  );
};

export default Headlines;
