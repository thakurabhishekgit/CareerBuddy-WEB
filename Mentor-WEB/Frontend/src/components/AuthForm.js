import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [role, setRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interestedDomain, setInterestedDomain] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [marks, setMarks] = useState({
    math: '',
    physics: '',
    chemistry: '',
    english: ''
  });
  const [percentage10th, setPercentage10th] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [expertDomain, setExpertDomain] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMarksChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:6968/api/${role}s/${isRegistering ? 'register' : 'login'}`;
      const data = isRegistering
        ? role === 'student'
          ? {
              name,
              email,
              phone,
              password,
              interestedDomain,
              schoolName,
              marks,
              percentage10th,
              bio
            }
          : {
              name,
              email,
              phone,
              password,
              expertDomain,
              experience,
              bio
            }
        : { email, password };

      const response = await axios.post(url, data);

      console.log("Response data:", response.data);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('jwtToken', token); 
        console.log("Token stored:", token);
        navigate('/home'); 
      } else {
        setError('Token not found in response');
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials or try again.');
      console.error('Auth error:', err);
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2 style={styles.header}>{isRegistering ? 'Register' : 'Login'}</h2>
      <div style={styles.roleSelector}>
        <label style={styles.label}>
          <input
            type="radio"
            value="student"
            checked={role === 'student'}
            onChange={() => setRole('student')}
            style={styles.radio}
          />
          Student
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            value="mentor"
            checked={role === 'mentor'}
            onChange={() => setRole('mentor')}
            style={styles.radio}
          />
          Mentor
        </label>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegistering && role === 'student' && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Interested Domain"
              value={interestedDomain}
              onChange={(e) => setInterestedDomain(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="School Name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="math"
              placeholder="Math Marks"
              value={marks.math}
              onChange={handleMarksChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="physics"
              placeholder="Physics Marks"
              value={marks.physics}
              onChange={handleMarksChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="chemistry"
              placeholder="Chemistry Marks"
              value={marks.chemistry}
              onChange={handleMarksChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="english"
              placeholder="English Marks"
              value={marks.english}
              onChange={handleMarksChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="10th Percentage"
              value={percentage10th}
              onChange={(e) => setPercentage10th(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Bio (Optional)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={styles.input}
            />
          </>
        )}
        {isRegistering && role === 'mentor' && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Expert Domain"
              value={expertDomain}
              onChange={(e) => setExpertDomain(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Bio (Optional)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={styles.input}
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  authContainer: {
    width: '350px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  roleSelector: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  label: {
    marginRight: '20px',
    fontSize: '16px',
    color: '#333'
  },
  radio: {
    marginRight: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
  },
  toggleButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px'
  }
};


export default AuthForm;
