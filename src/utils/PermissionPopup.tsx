import Dialog from '@mui/material/Dialog';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import Button from '@mui/material/Button';
import popupStyle from '../assets/css/PermissionPopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogText?: string;
  type?: string;
  callback: (...args: any[]) => any;
};

function PermissionPopup({ open, setOpen, dialogText, callback, type }: Props) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const onEventHandler = (event: any) => {
    if (event === 'yes') {
      callback();
    }
    setOpen(false);
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: popupStyle.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={popupStyle.Content}>
        {type === 'shock' ? (
          <SentimentVeryDissatisfiedIcon className={popupStyle.Icon} />
        ) : (
          <SentimentSatisfiedAltOutlinedIcon className={popupStyle.Icon} />
        )}
        <div className={popupStyle.Title}>Hey Wait!</div>
        <div className={popupStyle.Message}>{dialogText}</div>
        <div className={popupStyle.Actions}>
          <Button
            onClick={() => onEventHandler('yes')}
            className={popupStyle.ButtonOutlined}
            type="button"
            color="inherit"
          >
            Yes
          </Button>
          <Button
            onClick={() => onEventHandler('no')}
            className={popupStyle.ButtonFilled}
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

export default PermissionPopup;
