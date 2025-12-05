import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

// MUI Roboto Font Imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Redux-toolkit
import { Provider } from 'react-redux';
import store from './app/store';


createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <App />
    </Provider>

)
