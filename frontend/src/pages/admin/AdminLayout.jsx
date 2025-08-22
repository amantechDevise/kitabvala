// src/pages/admin/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './common/Navbar';
import AdminSidebar from './common/Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminLayouts = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/tech/login'); // Redirect if no token
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check for success and store user info
        if (res.status === 200 && res.data.loginUser) {
          setUserData(res.data.loginUser);
        } else {
          navigate('/admin/tech/login');
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
        navigate('/admin/tech/login'); // Redirect on error
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <>
      <AdminNavbar userData={userData}  />
      <AdminSidebar />
      <main className="pt-20 sm:ml-64 p-4 bg-gray-50 min-h-screen dark:bg-gray-900">
        <Outlet  />
      </main>
      {/* <AdminFooter /> */}
    </>
  );
};

export default AdminLayouts;
