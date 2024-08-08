import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { AppCategoryItems } from '../../interfaces/category.interface';
import { addToCart, setCart } from '../../redux/features/cartSlice';
import { showNotifyMessage } from '../../redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import ratingService from '../../services/adminapp/rating';
import RatingAccordions from '../rating/RatingAccordin';
import { CURRENCY_PREFIX } from '../../utils/constants';

type HomePagePopupProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: AppCategoryItems | null;
  FAQs: any;
};

function HomePagePopup({
  open,
  setOpen,
  data,
  FAQs: _FAQs,
}: HomePagePopupProps) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  const [ratingDetail, setRatingDetail] = useState<any>();
  const dispatch = useAppDispatch();
  const [_isLoader, setIsLoader] = useState(true);
  const { items: cartItems } = useAppSelector(
    (x) => x.persistedReducer.cartState
  );
  const [_expanded, setExpanded] = useState<string | false>(false);
  const _handleChange =
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

  const updateCart = (item: AppCategoryItems | any, quantity = 1) => {
    const allItemsOfCart = [...cartItems];
    const ItemIndex = allItemsOfCart.findIndex((x) => x.id === item.id);
    allItemsOfCart[ItemIndex] = { ...item, quantity };
    dispatch(setCart(allItemsOfCart));
  };

  const addInToCartHandler = (id: string | undefined, quantity = 1) => {
    const c = cartItems.find((x: any) => x.id === id);
    if (c) {
      updateCart(data, quantity);
    } else {
      dispatch(addToCart({ ...data, quantity }));
    }
    setCount(1);
    setOpen(false);
    dispatch(
      showNotifyMessage({ text: 'Item added successfully', type: 'success' })
    );
  };

  const fetchData = async () => {
    try {
      setIsLoader(true);
      const [catDetailResponse] = await Promise.all([
        ratingService.getCatStarDetail(data?.id),
      ]);

      // Handling detail response
      if (catDetailResponse.data.success) {
        setRatingDetail(catDetailResponse.data.data);
      } else {
        throw new Error(catDetailResponse.data.message);
      }

      setIsLoader(false);
    } catch (error: Error | any) {
      setIsLoader(false);
      dispatch(showNotifyMessage({ text: error.message, type: 'error' }));
    }
  };

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onCloseHandler} className="modal-add-to-cart">
      <IconButton onClick={() => setOpen(false)} className="btn-close">
        <ClearIcon />
      </IconButton>
      <DialogContent className="modal-content">
        <div className="main-grid">
          <div className="modal-wrap">
            <div className="product-img flex justify-center">
              <img
                className="max-h-[50%] max-w-[50%] object-contain"
                src={data?.icon}
                alt=""
              />
            </div>
            <div className="p-4">
              <h4 className="product-name">{data?.name}</h4>
              <p className="product-desc">cloth</p>
              <div className="flex-container flex items-center justify-between">
                <div className="price">
                  <h3 className="number">
                    {CURRENCY_PREFIX} <span>{data?.price}</span>
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
          <RatingAccordions data={ratingDetail?.homeCatItemFaq} />
        </div>
      </DialogContent>
      <DialogActions className="modal-footer">
        <Button
          className="btn-add"
          onClick={() => {
            addInToCartHandler(data?.id, count);
          }}
        >
          Add to Basket
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HomePagePopup;
