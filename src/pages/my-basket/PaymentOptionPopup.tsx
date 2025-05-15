import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import assets from '../../assets';
import cn from '../../utils/class-names';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePopupClose: (paymentType: 'CASH' | 'ONLINE' | null) => void;
};

function PaymentOptionPopup({ open, setOpen, handlePopupClose }: Props) {
  const onCloseHandler = (event: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      handlePopupClose(null);
      setOpen(false);
    }
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      classes={{ paper: cn('m-4 w-full max-w-sm rounded-xl shadow-md') }}
      slotProps={{
        backdrop: {
          classes: {
            root: cn('backdrop-blur-xl'),
          },
        },
      }}
    >
      <DialogContent className="px-5 pb-5 pt-10 text-center">
        <p className="mb-0 px-2 text-base font-semibold text-zinc-900  sm:px-4">
          Select Payment Type
        </p>
      </DialogContent>
      <DialogActions className="gap-x-5 p-5">
        <Button
          onClick={() => {
            setOpen(false);
            handlePopupClose('CASH');
          }}
          className="m-0 min-h-[2.5rem] w-full rounded-xl  border border-solid border-stone-900 bg-stone-900 font-open-sans text-base font-semibold capitalize text-white hover:bg-stone-900"
          type="button"
          color="inherit"
        >
          <img
            className="mr-2 aspect-square w-10 object-cover"
            src={assets.images?.cash}
            alt=""
          />
          Cash
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            handlePopupClose('ONLINE');
          }}
          className="m-0 min-h-[2.5rem] w-full rounded-xl  border border-solid border-stone-900 bg-stone-900 font-open-sans text-base font-semibold capitalize text-white hover:bg-stone-900"
          type="button"
          color="inherit"
        >
          <img
            className="mr-2 aspect-square w-10 object-cover"
            src={assets.images.card}
            alt=""
          />
          Card
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentOptionPopup;
