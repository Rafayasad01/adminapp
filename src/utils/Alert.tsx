import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // return <MuiAlert elevation={6} ref={ref} variant="filled" />;
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertBoxProps = {
  msg: string;
  setSeverity: any;
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AlertBox({
  msg,
  setSeverity,
  alertOpen,
  setAlertOpen,
}: AlertBoxProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={setSeverity}
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AlertBox;
