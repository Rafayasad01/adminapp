import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notify from '../../components/common/Notify';
import { AppCategoryItems } from '../../interfaces/category.interface';
import {
  fetchItemsByCategory,
  setNotifyState,
} from '../../redux/features/itemSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { CURRENCY_PREFIX } from '../../utils/constants';
import HomePagePopup from './HomePagePopup';

interface CategoryItemsListProps {
  categoryId: string | any;
  search: string | any;
}
const CategoryItemsList: React.FC<CategoryItemsListProps> = ({
  categoryId,
  search,
}) => {
  const dispatch = useAppDispatch();
  const { items, notify, notifyMessage } = useAppSelector((x) => x.itemState);
  const [searchedItems, setSearchedItems] = useState<AppCategoryItems[]>([]);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<AppCategoryItems | null>(
    null
  );
  const [openAddToCart, setOpenAddToCart] = useState<boolean>(false);

  useEffect(() => {
    if (!_.isEmpty(categoryId)) {
      dispatch(fetchItemsByCategory(categoryId));
    }
  }, [categoryId]);

  const setNotifyDisplay = (value: boolean) => {
    dispatch(setNotifyState(value));
  };

  const handleItemSelected = (value: AppCategoryItems) => {
    setSelectedItem(value);
    setOpenAddToCart(true);
  };

  useEffect(() => {
    if (!_.isEmpty(search) && items.length > 0) {
      const filteredItems = items.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedItems(filteredItems);
    } else {
      setSearchedItems([]);
    }
  }, [search]);

  return (
    <div className="categories-list">
      {searchedItems.map((item: AppCategoryItems) => (
        <div key={item.id} className="item">
          <button
            className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
            onClick={() => navigate(`../item/${item.id}`)}
          >
            <img
              className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
              src={item.icon}
              alt=""
            />
          </button>
          <div className="flex flex-wrap items-center justify-between">
            <h5 className="name">{item.name}</h5>
            <h6 className="price">
              {CURRENCY_PREFIX} {item.price}
            </h6>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabIndex={0}
              onClick={() => handleItemSelected(item)}
              type="button"
            >
              Add
              <span className="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ShoppingBagOutlinedIcon"
                >
                  <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
                </svg>
              </span>
              <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
            </button>
          </div>
        </div>
      ))}
      {search === '' &&
        items.map((item: AppCategoryItems) => (
          <div key={item.id} className="item">
            <button
              className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
              onClick={() => navigate(`../item/${item.id}`)}
            >
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src={item.icon}
                alt=""
              />
            </button>
            <div className="flex flex-wrap items-center justify-between">
              <h5 className="name">{item.name}</h5>
              <h6 className="price">
                {CURRENCY_PREFIX} {item.price}
              </h6>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                tabIndex={0}
                onClick={() => handleItemSelected(item)}
                type="button"
              >
                Add
                <span className="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagOutlinedIcon"
                  >
                    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
                  </svg>
                </span>
                <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
              </button>
            </div>
          </div>
        ))}
      <HomePagePopup
        open={openAddToCart}
        setOpen={setOpenAddToCart}
        data={selectedItem}
        FAQs={[]}
      />
      <Notify
        isOpen={notify}
        setIsOpen={setNotifyDisplay}
        displayMessage={notifyMessage}
      />
    </div>
  );
};
export default memo(CategoryItemsList);
