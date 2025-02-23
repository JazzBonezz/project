import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';

const root = createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
