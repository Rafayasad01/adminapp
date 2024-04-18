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

function HomePagePopup({ open, setOpen, data, FAQs }: Props) {
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
    setOpen(true);
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
            <div className="modal-wrap">
              <div className="product-img">
                <img src={data?.icon} alt="" />
              </div>
              <div className="p-4">
                <h4 className="product-name">{data?.name}</h4>
                <p className="product-desc">cloth</p>
                <div className="flex-container flex items-center justify-between">
                  <div className="price">
                    <h3 className="number">
                      $ <span>{data?.price.toFixed(2)}</span>
                    </h3>
                    <p className="text">&nbsp;/ item</p>
                  </div>
                  <div className="count">
                    <IconButton
                      onClick={decrementCount}
                      className="btn-decrement"
                    >
                      <RemoveCircleOutlineOutlinedIcon className="icon" />
                    </IconButton>

                    <div className="number">{count}</div>
                    <IconButton
                      onClick={incrementCount}
                      className="btn-increment"
                    >
                      <AddCircleOutlineOutlinedIcon className="icon" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            {FAQs?.map((faq: any, index: any) => (
              <div className="product-accordion" key={index}>
                <Accordion
                  key={index}
                  className="accordion-item"
                  expanded={expanded === `panel-${index}`}
                  onChange={handleChange(`panel-${index}`)}
                >
                  <AccordionSummary
                    className="accordion-header"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                  >
                    <h6 className="heading">{faq.question}</h6>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-body">
                    <p className="desc">{faq.answer}</p>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button
            className="btn-add"
            onClick={() => {
              const cartItem = {
                ...data,
                buyCount: count,
              };
              addToBasketHandler(cartItem);
            }}
          >
            Add to Basket
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HomePagePopup;
