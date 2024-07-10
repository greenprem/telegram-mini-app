"use client";

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem('randomId');
    if (!storedClientId) {
      const newClientId = generateRandomId();
      localStorage.setItem('randomId', newClientId);
      setClientId(newClientId);
    } else {
      setClientId(storedClientId);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(URL.createObjectURL(file));

    // Upload image file to FastAPI endpoint
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/upload/', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Update wait time in state
        setWaitTime(data.estimated_wait_time);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
      });

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <div
        {...getRootProps()}
        className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600">Drop the image here ...</p>
        ) : (
          <p className="text-gray-600">Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      <button
        onClick={() => {
          const inputElement = document.querySelector('input[type="file"]');
          if (inputElement) {
            (inputElement as HTMLInputElement).click();
          }
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        Upload Image
      </button>
      {selectedImage && (
        <div className="mt-4">
          <Image src={selectedImage} alt="Uploaded Image" width={500} height={500} className="rounded-lg" />
        </div>
      )}
      {clientId && (
        <div className="mt-4 text-gray-600">
          <p>Client ID: {clientId}</p>
        </div>
      )}
      {waitTime !== null && (
        <div className="mt-4 text-gray-600">
          <p>Estimated Wait Time: {waitTime} seconds</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
