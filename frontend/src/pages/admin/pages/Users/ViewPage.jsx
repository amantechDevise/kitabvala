import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ViewPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/user/${id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!user) return <div className="text-center py-10 text-red-500">User not found</div>;

  return (
    <div className="p-5 border-gray-400 rounded text-center text-gray-700 max-w-[900px] mx-auto mt-10 shadow-md bg-white">
      <img
        className="w-50 h-50 rounded-full mx-auto object-cover border"
        src={user.image || '/avtar.jpg'} 
        alt={user.name}
      />
      <div className="text-sm mt-5">
        <h2 className="text-lg font-semibold text-gray-900 text-[30px]">{user.name}</h2>
        <p className="text-gray-600 text-[25px]"><span className='text-bold'> Phone:</span>  {user.phone || 'N/A'}</p>
        <p className="text-gray-600 text-[25px]"><span className='text-bold'> Email:</span>  {user.email || 'N/A'}</p>
      </div>
     
    </div>
  );
}

export default ViewPage;
