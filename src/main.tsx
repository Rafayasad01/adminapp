import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactGA from 'react-ga4';
import App from './App';
import './index.css';
import Page404 from './pages/404/Page404';
import { persistor, store } from './redux/store';

const GA_MEASUREMENT_ID = 'G-7K9Q8QYDVT';
ReactGA.initialize(GA_MEASUREMENT_ID);

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
            <ErrorBoundary FallbackComponent={Page404}>
              <App />
            </ErrorBoundary>
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
