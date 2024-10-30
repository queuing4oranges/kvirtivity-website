import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './i18n';

createRoot(document.getElementById('root')).render(
    <App />
)
