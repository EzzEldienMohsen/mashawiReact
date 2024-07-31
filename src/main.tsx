import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store.js';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
// language

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
          <ToastContainer position="top-center" autoClose={2000} />
        </Provider>
      </I18nextProvider>
    </>
  );
} else {
  console.error('Root element not found');
}
