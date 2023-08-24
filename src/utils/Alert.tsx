import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // return <MuiAlert elevation={6} ref={ref} variant="filled" />;
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  msg: string;
  setSeverty: any;
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AlertBox({ msg, setSeverty, alertOpen, setAlertOpen }: Props) {
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
          severity={setSeverty}
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AlertBox;
