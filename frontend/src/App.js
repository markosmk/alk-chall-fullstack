import { BrowserRouter } from 'react-router-dom';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="top-right">
        {(t) => (
          <div style={{ cursor: 'pointer' }} onClick={() => toast.dismiss(t.id)}>
            <ToastBar onClick={() => alert(1)} toast={t} />
          </div>
        )}
      </Toaster>
    </BrowserRouter>
  );
}

export default App;
