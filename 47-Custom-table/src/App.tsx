// src/App.tsx
import './App.css';
import { useRef, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import ArtTable from './pages/ArtTable';
import { useRowSelection } from './state/selections';
// import { SelectionPanel } from './components/SelectionPanel';

export default function App() {
  const { selectedIds, selectMany, deselectMany } = useRowSelection();
  const toastRef = useRef<Toast>(null);

  const showError = useCallback((msg: string) => {
    toastRef.current?.show({ severity: 'error', summary: 'Error', detail: msg, life: 4000 });
  }, []);

  return (
    <div className="p-4 md:p-6">
      <Toast ref={toastRef} />
      <h1 className="text-xl font-semibold mb-3">Artworks</h1>

      <div className="grid gap-4">
        <Card>
          <ArtTable
            selectedIds={selectedIds}
            selectMany={selectMany}
            deselectMany={deselectMany}
            onError={showError}
          />
        </Card>
      </div>
    </div>
  );
}
