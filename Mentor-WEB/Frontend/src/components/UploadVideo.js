import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [mentorDetails, setMentorDetails] = useState({});
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:6969/api/mentors/mentor-details', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMentorDetails(response.data);
      } catch (err) {
        console.error('Error fetching mentor details:', err);
        setError('Error fetching mentor details');
      } finally {
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, []);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setError('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('description', description);

    // Log data to be sent to backend
    console.log('Submitting video with description:', description);
    console.log('Video file:', video);
    console.log('Token:', localStorage.getItem('jwtToken'));

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:6969/api/mentors/upload-video', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Video uploaded successfully:', response.data);
      setSuccess('Video uploaded successfully');
      setError(null);
    } catch (err) {
      console.error('Error uploading video:', err.response ? err.response.data : err.message);
      setError('Error uploading video');
      setSuccess('');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '600px',
  };

  const headerStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const textareaStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : success ? (
        <p style={{ color: 'green' }}>{success}</p>
      ) : null}

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headerStyle}>Upload Video</h2>
        
        {/* Display Mentor Information */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '20px', color: '#555' }}>Mentor Information</h3>
          <p><strong>Name:</strong> {mentorDetails.fullName}</p>
          <p><strong>Email:</strong> {mentorDetails.email}</p>
          <p><strong>Phone:</strong> {mentorDetails.phone}</p>
          <p><strong>Domain:</strong> {mentorDetails.domain}</p>
        </div>
        
        <div>
          <label style={labelStyle}>Video:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={textareaStyle} required />
        </div>
        <button type="submit" style={buttonStyle}>Upload</button>
      </form>
    </div>
  );
};

export default UploadVideo;
