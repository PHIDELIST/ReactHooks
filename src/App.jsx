import React, { useState, useEffect } from 'react';
import './App.css';



const App = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (country) {
      setIsLoading(true);
      fetch(`http://universities.hipolabs.com/search?country=${country}`)
        .then(response => response.json())
        .then(data => {
          setUniversities(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [country]);

  const handleSearch = () => {
    setUniversities([]);
    if (country) {
      setCountry(country.trim());
    }
  };

  return (
    <div id='poolmain'>
      <h1>Your Trusted University Pool</h1>
      <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Enter a country name"
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading ? (
        <p>.........</p>
      ) : universities.length ? (
        <div id='universityArea'>
        <div>
          {universities.map(university => (
            <div id='university-container' key={university.name} >
              <h3>{university.name}</h3>
              <p>Country: {university.country}</p>
              <p>CountryCode: {university.alpha_two_code}</p>
              <p>Website: <a href={university.web_pages[0]}>{university.web_pages[0]}</a></p>
              <p>Domain: <a href={university.domains[0]}>{university.domains[0]}</a></p>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p>No universities found.</p>
      )}
    </div>
  );
};

export default App;

