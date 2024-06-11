import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import { useEffect, useRef } from 'react';
import popupStyle from '../assets/css/PermissionPopup.module.css';
import CustomInputBox from '../components/common/CustomInputBox';
import { ORDER_STATUS, PATTERN } from './constants';

type PermissionPopupProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogText?: string;
  dialogDesc?: string;
  type?: string;
  callback: (...args: any[]) => any;
  register?: any;
  errors?: any;
  watch?: any;
  setError?: any;
  clearErrors?: any;
  status?: any;
};

function PermissionPopup({
  open,
  setOpen,
  dialogText,
  dialogDesc,
  callback,
  register,
  errors,
  type,
  watch,
  setError,
  clearErrors,
  status,
}: // watch,
// setError,
PermissionPopupProps) {
  const isInitialRender = useRef(true);
  const balance = (watch && watch('balance')) || '';
  const onCloseHandler = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const onEventHandler = (event: any) => {
    if (event === 'yes') {
      // const balance = watch('balance');
      if (
        balance &&
        (!PATTERN.ONLY_NUM.test(balance) || watch('balance') <= 0)
      ) {
        return;
      }
      callback('yes');
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (balance === '') clearErrors && clearErrors('balance');
    if (balance) {
      if (!PATTERN.ONLY_NUM.test(balance) || balance <= 0) {
        setError('balance', {
          type: 'manual',
          message:
            'The field must contain only numbers, greater than 0 and non-negative.',
        });
        // return;
      }
      // clearErrors('balance');
    }
  }, [balance]);

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
        {status?.status === ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER &&
          status?.paymentType === 'CashOnDelivery' && (
            <form className="flex w-[80%]">
              <div className="w-full">
                <FormControl
                  className="FormControl w-[100%]"
                  variant="standard"
                >
                  <CustomInputBox
                    pattern={PATTERN.ONLY_NUM}
                    maxLetterLimit={15}
                    min={1}
                    // inputTitle="Amount"
                    placeholder="Update your balance Exp:(2500 PKR)"
                    id="balance"
                    register={register}
                    error={errors.balance}
                    sx={{
                      border: '1px solid',
                      padding: '5px',
                      borderRadius: '3px',
                      marginRight: '5px',
                      marginTop: '3px',
                      fontSize: '12px',
                    }}
                    inputType="text"
                  />
                </FormControl>
              </div>
            </form>
          )}
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
