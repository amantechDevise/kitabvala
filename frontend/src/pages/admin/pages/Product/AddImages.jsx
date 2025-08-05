// src/pages/ImageUploadPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddImage = () => {
  const { product_id } = useParams(); 
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExistingImages = async () => {
      if (!product_id) return;
      
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/get_images`, {
          params: { product_id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        if (res.data.success && res.data.data) {
          setExistingImages(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching existing images:", err);
        toast.error(err.response?.data?.message || 'Failed to fetch existing images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingImages();
  }, [product_id]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      toast.warning("Please select images first.");
      return;
    }

    if (!product_id) {
      toast.error("Product ID is missing. Cannot upload images.");
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('product_id', product_id);
    images.forEach((img) => {
      formData.append('images', img.file);
    });

    try {
      const res = await axios.post(`${API_BASE_URL}/admin/add_images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      toast.success('Images uploaded successfully!');
      setImages([]); // Clear previews after upload
      
      // Refresh the existing images list
      const refreshRes = await axios.get(`${API_BASE_URL}/admin/get_images`, {
        params: { product_id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (refreshRes.data.success) {
        setExistingImages(refreshRes.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to upload images.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

const handleDeleteExistingImage = async (imageId) => {
  
  try {
    const res = await axios.delete(`${API_BASE_URL}/admin/delete_image/${imageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    if (res.data.message === "Images deleted successfully") {
      toast.success('Image deleted successfully!');
      setExistingImages(prev => prev.filter(img => img.id !== imageId));
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Failed to delete image.');
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Upload Product Images</h2>
       
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Images ({existingImages.length})</h3>
              <div className="flex flex-wrap gap-4">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={`${API_BASE_URL}${img.images}`}
                      alt={`product-${img.id}`}
                      className="h-32 w-32 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                    <button
                      onClick={() => handleDeleteExistingImage(img.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete image"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dropzone Area */}
          <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-12 text-center mb-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
              disabled={isUploading}
            />
            <div className="text-center pointer-events-none">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {images.length > 0 
                  ? `${images.length} image(s) selected`
                  : 'Drag and drop or click to browse'}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, JPEG up to 10MB each
              </p>
            </div>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">New Images to Upload:</h4>
              <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.url}
                      alt={`preview-${index}`}
                      className="h-32 w-32 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                images.forEach(img => URL.revokeObjectURL(img.url));
                setImages([]);
              }}
              disabled={images.length === 0 || isUploading}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={images.length === 0 || isUploading || !product_id}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : `Upload ${images.length} Image(s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;