import { useState } from 'react'
import './App.css'

// Followers.js

import React, { useEffect } from 'react';

const Followers = ({ username }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);
        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.login}</li>
        ))}
      </ul>
    </div>
  );
};




// App.js


import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  
  return (
    <div className='flex flex-col  border-2 items-center gap-3'>
      <h2>Home Page</h2>
      <p className='flex flex-col w-2/3'>
        Enter a GitHub username:
        <input type="text" value={username} onChange={handleInputChange}
        className='bg-slate-400'
         />
        <button className='bg-sky-800 w-64 items-center justify-items-center'
        >
          <Link to={`/followers/${username}`}>Show Followers</Link>
        </button>
      </p>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followers/:username" element={<FollowersWrapper />} />
    </Routes>
  </Router>
);

const FollowersWrapper = () => {
  const { username } = useParams();
  return <Followers username={username} />;
};

export default App;
