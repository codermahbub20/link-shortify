

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../DashBoard/SideBar/Sidebar';


const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <Sidebar />

      
      <div className="flex-1 ml-64">
  
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;