import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import App from './App';
import { store, persistor } from './redux/store';
import './index.css';

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiModal: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
