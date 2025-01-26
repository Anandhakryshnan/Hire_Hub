import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

const MaterialUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { programId } = useParams();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    if (!files || files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    setUploading(true);

    // Prepare FormData for file upload
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('files', file));
    const companyId = localStorage.getItem('token'); // Assuming token is companyId
    formData.append('companyId', companyId);

    // Make the API call
    fetch(`http://localhost:9000/upload-materials/${programId}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(`Materials uploaded successfully`);
          setFiles([]);
        } else {
          alert(`Upload failed: ${data.message}`);
        }
        setUploading(false);
      })
      .catch((error) => {
        console.error('Error during upload:', error);
        alert('Error uploading materials.');
        setUploading(false);
      });
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload Materials</h2>
      <div className="flex items-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md"
          multiple
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 text-white rounded-md ${
            uploading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Materials'}
        </button>
        <button
          onClick={() => navigate('/trainingHome')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MaterialUpload;
