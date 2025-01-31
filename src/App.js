import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [downloadURL, setDownloadURL] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('course', course);
    formData.append('year', year);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDownloadURL(res.data.downloadURL);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Error uploading file');
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/download/${course}/${year}`);
      window.open(res.data.downloadURL, '_blank');
    } catch (error) {
      console.error(error);
      alert('Error downloading file');
    }
  };

  return (
    <div>
      <h1>Past Question App</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
      </form>
      <button onClick={handleDownload}>Download</button>
      {downloadURL && <a href={downloadURL} target="_blank" rel="noopener noreferrer">Download Link</a>}
    </div>
  );
}

export default App;