import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userRole }) => {
  return (
    <div style={styles.sidebar}>
      <h2>{userRole === 'mentor' ? 'Mentor Dashboard' : 'Student Dashboard'}</h2>
      <ul style={styles.menu}>
        <li>
          <Link to="/home" style={styles.link}>Home</Link>
        </li>
        {userRole === 'mentor' && (
          <li>
            <Link to="/upload-video" style={styles.link}>Upload Video</Link>
          </li>
        )}
        
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRight: '1px solid #ddd',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    display: 'block',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
};

export default Sidebar;
