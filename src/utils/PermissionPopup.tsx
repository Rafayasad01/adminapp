import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import popupStyle from '../assets/css/PermissionPopup.module.css';

type PermissionPopupProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogText?: string;
  dialogDesc?: string;
  type?: string;
  callback: (...args: any[]) => any;
};

function PermissionPopup({
  open,
  setOpen,
  dialogText,
  dialogDesc,
  callback,
  type,
}: PermissionPopupProps) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const onEventHandler = (event: any) => {
    if (event === 'yes') {
      callback('yes');
    }
    setOpen(false);
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      className="customheight"
      PaperProps={{
        className: popupStyle.Dialog,
        style: {},
      }}
    >
      <div className={popupStyle.Content}>
        {type === 'shock' ? (
          <SentimentVeryDissatisfiedIcon className={popupStyle.Icon} />
        ) : type === 'thumb' ? (
          <ThumbUpAltOutlinedIcon className={popupStyle.Icon} />
        ) : (
          <SentimentSatisfiedAltOutlinedIcon className={popupStyle.Icon} />
        )}
        <div className={popupStyle.Title}>Hey Wait!</div>
        <div className={popupStyle.Message}>{dialogText}</div>
        {dialogDesc ? (
          <div className={popupStyle.DescMessage}>Note : {dialogDesc}</div>
        ) : (
          ''
        )}
        <div className={popupStyle.Actions}>
          <Button
            onClick={() => onEventHandler('yes')}
            className={`${popupStyle.ButtonOutlined} btn-black-outline`}
            type="button"
            color="inherit"
          >
            Yes
          </Button>
          <Button
            onClick={() => onEventHandler('no')}
            className={`${popupStyle.ButtonFilled} btn-black-fill`}
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
