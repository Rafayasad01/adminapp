import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

type OrderLoginPopupProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  FAQs: any;
};

function OrderLoginPopup({
  open,
  setOpen,
  data: _data,
  FAQs: _FAQs,
}: OrderLoginPopupProps) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  const [_expanded, setExpanded] = useState<string | false>(false);
  const _handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [_count, setCount] = useState(1);
  const _incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };
  const _decrementCount = () => {
    setCount((previousCount) => {
      if (previousCount <= 1) {
        return 1;
      }
      return previousCount - 1;
    });
  };
  const _addToBasketHandler = (_tempCartData: any) => {
    setOpen(false);
    setCount(1);
  };
  return (
    <Dialog open={open} onClose={onCloseHandler} className="modal-add-to-cart">
      <IconButton onClick={() => setOpen(false)} className="btn-close">
        <ClearIcon />
      </IconButton>
      <DialogContent className="modal-content">
        <div className="main-grid">
          <div className="flex items-center justify-start p-[20px]">
            <div className="mr-2 flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                defaultValue=""
                name="default-radio"
                className="rdb h-4 w-4 border-gray-300 bg-gray-100 text-blue-600  "
              />
              <label
                htmlFor="default-radio-1"
                className="ml-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default radio
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                defaultValue=""
                name="default-radio"
                className="rdb h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 "
              />
              <label
                htmlFor="default-radio-2"
                className="ml-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Checked state
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderLoginPopup;
