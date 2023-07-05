import Dialog from '@mui/material/Dialog';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from '@mui/material/Button';
import SuperAdminOrderStyle from './SuperAdminOrderDetailsPagePopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SuperAdminOrderDetailsPagePopup({ open, setOpen }: Props) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: SuperAdminOrderStyle.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={SuperAdminOrderStyle.Content}>
        <SentimentVeryDissatisfiedIcon
          className={SuperAdminOrderStyle.Icon}
        />
        <div className={SuperAdminOrderStyle.Title}>Hey Wait!</div>
        <div className={SuperAdminOrderStyle.Message}>
          Are you sure you want to Cancel this Order
        </div>
        <div className={SuperAdminOrderStyle.Actions}>
          <Button
            onClick={() => setOpen(false)}
            className={SuperAdminOrderStyle.ButtonOutlined}
            type="button"
            color="inherit"
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className={SuperAdminOrderStyle.ButtonFilled}
            type="button"
            color="inherit"
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SuperAdminOrderDetailsPagePopup;
