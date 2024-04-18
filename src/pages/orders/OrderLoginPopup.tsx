import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  FAQs: any;
};

function OrderLoginPopup({ open, setOpen, data, FAQs }: Props) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };
  const decrementCount = () => {
    setCount((previousCount) => {
      if (previousCount <= 1) {
        return 1;
      }
      return previousCount - 1;
    });
  };
  const addToBasketHandler = (tempCartData: any) => {
    setOpen(false);
    setCount(1);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onCloseHandler}
        className="modal-add-to-cart"
      >
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
                  className="ms-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                  className="ms-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Checked state
                </label>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrderLoginPopup;
