import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarContextProps {
  showMessage: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>(
    'info'
  );

  const showMessage = (
    msg: string,
    severity: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    setMessage(msg);
    setType(severity);
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{
            width: '100%',
            bgcolor:
              type === 'error'
                ? '#D32F2F'
                : type === 'success'
                ? '#388E3C'
                : undefined,
            color: '#fff',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
