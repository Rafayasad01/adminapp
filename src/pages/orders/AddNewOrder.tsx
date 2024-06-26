import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import { AppCategories } from '../../interfaces/category.interface';
import {
  fetchCategories,
  setNotifyState,
} from '../../redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import CategoriesCard from './CategoriesCard';
import CategoryItemsList from './CategoryItemsList';
import OrderLoginPopup from './OrderLoginPopup';

const AddNewOrder = () => {
  const { categories, notify, notifyMessage } = useAppSelector(
    (x) => x.categoryState
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state?.authState);
  const [category, setCategory] = useState<AppCategories | null>(null);
  const [search, setSearch] = useState('');
  // const [searchInputValue, setInputValue] = useState('');
  const { items: cartItems } = useAppSelector(
    (x) => x.persistedReducer.cartState
  );

  useEffect(() => {
    dispatch(fetchCategories(authState.user?.tenant));
  }, []);

  const handleCategoryChange = (value: string) => {
    const c = categories.find((x) => x.id === value);
    if (c) {
      setCategory(c);
    }
  };

  useEffect(() => {
    if (_.isEmpty(category) && categories.length > 0) {
      setCategory(categories.at(0) ?? null);
    }
  }, [category, categories]);

  const setNotifyDisplay = (value: boolean) => {
    dispatch(setNotifyState(value));
  };

  return (
    <>
      <Notify
        isOpen={notify}
        setIsOpen={setNotifyDisplay}
        displayMessage={notifyMessage}
      />
      <OrderLoginPopup
        open={false}
        setOpen={() => null}
        data={{
          id: 1,
          price: 10,
          name: 'room',
          icon: 'https://lundry-app-admin.s3.ca-central-1.amazonaws.com/menu/1d6f0e45-37c1-4975-af97-2bdeafdb4d6b-Commercial.png',
        }}
        FAQs={[]}
      />
      <TopBar isNestedRoute title="Order" />
      <div className="px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories">
          <div className="category-wrap">
            <h4 className="heading">Categories</h4>
            <button
              className="active"
              onClick={() => navigate('../basket')}
              aria-current="page"
              type="button"
            >
              <span className="MuiBadge-root css-1c32n2y-MuiBadge-root">
                <div
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium p-0 text-gray-50 "
                  aria-label="cart-button"
                >
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagOutlinedIcon"
                  >
                    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
                  </svg>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </div>
                <span className="MuiBadge-badge custom-badge MuiBadge-standard MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular css-fvc8ir-MuiBadge-badge">
                  {cartItems.length}
                </span>
              </span>
            </button>
          </div>

          <CategoriesCard
            categories={categories}
            onClick={(id: string) => handleCategoryChange(id)}
          />
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">{category?.name ?? ''} </h4>
            <FormControl className="search-sub-cats">
              <Input
                className="field"
                id="search"
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === '') {
                    setSearch('');
                  }
                }}
                inputProps={{
                  placeholder: 'Search',
                }}
                disableUnderline
                endAdornment={
                  // <Button onChange={() => setSearch(searchInputValue)}>
                  <SearchOutlinedIcon />
                  // </Button>
                }
              />
            </FormControl>
          </div>
          <CategoryItemsList search={search} categoryId={category?.id} />
        </div>
      </div>
    </>
  );
};
export default memo(AddNewOrder);
