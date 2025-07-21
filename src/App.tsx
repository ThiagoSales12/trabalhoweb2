import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { ClientsView } from './views/ClientsView';
import { ProjectDetailsView } from './views/ProjectDetailsView';
import type { Client } from './types';

const App = () => {
  const [currentView, setCurrentView] = useState<'clients' | 'projectDetails'>('clients');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setCurrentView('projectDetails');
  };

  const handleBackToClients = () => {
    setSelectedClient(null);
    setCurrentView('clients');
  };

  return (
    <AppProvider>
      <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 md:p-8">
        <div className="container mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <header className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <CheckSquare className="text-indigo-400" size={28} />
                    <h1 className="text-xl font-bold">Gerenciador de Projetos</h1>
                </div>
            </header>
            <main className="p-4 md:p-8">
              {currentView === 'clients' && <ClientsView onSelectClient={handleSelectClient} />}
              {currentView === 'projectDetails' && selectedClient && <ProjectDetailsView client={selectedClient} onBack={handleBackToClients} />}
            </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;