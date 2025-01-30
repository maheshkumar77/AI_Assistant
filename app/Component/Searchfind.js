import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setIsLoading(true);
    setAnswer('');

    try {
      // Replace with your preferred search API (e.g., Google Custom Search, Bing, etc.)
      const apiKey = 'YOUR_SEARCH_API_KEY'; // Securely store this in environment variables
      const searchUrl = `https://api.example.com/search?q=${encodeURIComponent(query)}&key=${apiKey}`;

      const response = await axios.get(searchUrl);
      const result = response.data.items[0].snippet; // Extract the first result snippet

      setAnswer(result);
      speak(result); // Speak the answer
    } catch (error) {
      console.error('Error fetching results:', error);
      setAnswer('Error fetching results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search and Speak</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your question..."
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px', cursor: 'pointer' }}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      {answer && (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}