import Dialog from '@mui/material/Dialog';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from '@mui/material/Button';
import OrderDetailsPagePopupClasses from './OrderDetailsPagePopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function OrderDetailsPagePopup({ open, setOpen }: Props) {
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
        className: OrderDetailsPagePopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={OrderDetailsPagePopupClasses.Content}>
        <SentimentVeryDissatisfiedIcon
          className={OrderDetailsPagePopupClasses.Icon}
        />
        <div className={OrderDetailsPagePopupClasses.Title}>Hey Wait!</div>
        <div className={OrderDetailsPagePopupClasses.Message}>
          Are you sure you want to Cancel this Order
        </div>
        <div className={OrderDetailsPagePopupClasses.Actions}>
          <Button
            onClick={() => setOpen(false)}
            className={OrderDetailsPagePopupClasses.ButtonOutlined}
            type="button"
            color="inherit"
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className={OrderDetailsPagePopupClasses.ButtonFilled}
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

export default OrderDetailsPagePopup;
