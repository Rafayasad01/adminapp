import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
  displayMessage: any;
};

function Notify({ isOpen, setIsOpen, displayMessage }: Props) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    // setOpen(isOpen);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={displayMessage?.type}
        sx={{ width: '100%' }}
      >
        {displayMessage?.text}
      </Alert>
    </Snackbar>
  );
}

export default Notify;
