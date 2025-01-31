import React, { useState } from 'react';
import SalesStats from './SalesStats';
import ModelManagement from './ModelManagement';
import UploadModel from './UploadModel';
import StampManagement from './StampManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <SalesStats />;
      case 'models':
        return <ModelManagement />;
      case 'stamps':
        return <StampManagement />;
      case 'upload':
        return <UploadModel />;
      default:
        return <SalesStats />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="border-b border-gray-200 mb-4">
        <div className="flex gap-4">
          <button
            className={`py-2 px-4 ${
              activeTab === 'stats'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            Estadísticas
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'models'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('models')}
          >
            Gestión de Modelos
          </button>

          <button
            className={`py-2 px-4 ${
              activeTab === 'stamps'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('stamps')}
          >
            Gestión de Estampas
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'upload'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Subir Modelo
          </button>
        </div>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;