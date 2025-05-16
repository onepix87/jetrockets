import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Tasks } from './pages/tasks';
import './app.css'

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
    storage: window.localStorage,
})

const App: React.FC = () => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <Tasks />
        </PersistQueryClientProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);