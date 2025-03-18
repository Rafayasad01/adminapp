import Dialog from '@mui/material/Dialog';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import popupStyle from '../assets/css/PermissionPopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogText?: string;
  dialogDesc?: string;
  type?: string;
  callback?: (...args: any[]) => any;
};

function PermissionPopup({
  open,
  setOpen,
  dialogText,
  dialogDesc,
  callback,
  type,
}: Props) {
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
        <div className={popupStyle.DescMessage}>
          {dialogDesc ? `Note: ${dialogDesc}` : ''}
        </div>
        <div className={popupStyle.Actions}>
          <Button
            variant="outlined"
            onClick={() => onEventHandler('yes')}
            className="w-[50%] rounded-full text-secondary2"
            type="button"
            color="inherit"
          >
            Yes
          </Button>
          <Button
            onClick={() => onEventHandler('no')}
            className="w-[50%] rounded-full bg-background text-primary"
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
