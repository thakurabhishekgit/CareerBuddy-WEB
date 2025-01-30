import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthForm from './components/AuthForm';
import HomePage from './components/Home';
import UploadVideo from './components/UploadVideo';

const App = () => {
  const [userRole, setUserRole] = useState(null);

useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  return (
    <Router>
      
        <div style={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<AuthForm setUserRole={setUserRole} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/upload-video" element={userRole === 'mentor' ? <UploadVideo /> : <HomePage />} />
            
          </Routes>
        </div>
   
    </Router>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
  },
  contentContainer: {
    flex: 1,
    padding: '20px',
    // Adjust this if sidebar width changes
  },
};

export default App;
