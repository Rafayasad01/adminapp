import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import OrderLoginPopup from './OrderLoginPopup';
import CategoriesCard from './CategoriesCard';
import HomePagePopup from './HomePagePopup';
import TopBar from '../../components/common/TopBar';

const AddNewOrder = () => {
  const navigate = useNavigate();
  return (
    <>
      <HomePagePopup
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
            <a
              className="active"
              onClick={() => navigate('../basket')}
              aria-current="page"
            >
              <span className="MuiBadge-root css-1c32n2y-MuiBadge-root">
                <button
                  className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium p-0 text-gray-50 "
                  type="button"
                  aria-label="cart-button"
                >
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ShoppingBagOutlinedIcon"
                  >
                    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                  </svg>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                </button>
                <span className="MuiBadge-badge custom-badge MuiBadge-standard MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular css-fvc8ir-MuiBadge-badge">
                  2
                </span>
              </span>
            </a>
          </div>

          <CategoriesCard
            categories={[
              {
                id: 1,
                name: 'room',
                icon: 'https://lundry-app-admin.s3.ca-central-1.amazonaws.com/menu/1d6f0e45-37c1-4975-af97-2bdeafdb4d6b-Commercial.png',
              },
            ]}
            onClick={(id: string) => null}
          />
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">Commercial </h4>
            <FormControl className="search-sub-cats">
              <Input
                className="field"
                id="search"
                type="text"
                inputProps={{
                  placeholder: 'Search',
                }}
                disableUnderline
                endAdornment={<SearchOutlinedIcon />}
              />
            </FormControl>
          </div>
          <div className="categories-list">
            <div className="item">
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src="https://laundry-app.s3.ca-central-1.amazonaws.com/619943ef-8e9f-4a74-9e1e-4b299d19330d/theme/sub_menu/commercial/icon/hospital-curtain.png"
                alt=""
              />
              <div className="flex flex-wrap items-center justify-between">
                <h5 className="name">Hospital Curtains</h5>
                <h6 className="price">$ 16.78</h6>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
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
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
            <div className="item">
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src="https://laundry-app.s3.ca-central-1.amazonaws.com/619943ef-8e9f-4a74-9e1e-4b299d19330d/theme/sub_menu/commercial/icon/pillow-case.png"
                alt=""
              />
              <div className="flex flex-wrap items-center justify-between">
                <h5 className="name">Pillow Case</h5>
                <h6 className="price">$ 19.01</h6>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
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
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
            <div className="item">
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src="https://laundry-app.s3.ca-central-1.amazonaws.com/619943ef-8e9f-4a74-9e1e-4b299d19330d/theme/sub_menu/commercial/icon/hospital-bedsheet.png"
                alt=""
              />
              <div className="flex flex-wrap items-center justify-between">
                <h5 className="name">Hospital Bedsheet</h5>
                <h6 className="price">$ 12.34</h6>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
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
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
            <div className="item">
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src="https://laundry-app.s3.ca-central-1.amazonaws.com/619943ef-8e9f-4a74-9e1e-4b299d19330d/theme/sub_menu/commercial/icon/bed-blanket.png"
                alt=""
              />
              <div className="flex flex-wrap items-center justify-between">
                <h5 className="name">Bed Blanket</h5>
                <h6 className="price">$ 15.67</h6>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
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
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
            <div className="item">
              <img
                className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                src="https://laundry-app.s3.ca-central-1.amazonaws.com/619943ef-8e9f-4a74-9e1e-4b299d19330d/theme/sub_menu/commercial/icon/napkins.png"
                alt=""
              />
              <div className="flex flex-wrap items-center justify-between">
                <h5 className="name">Napkins</h5>
                <h6 className="price">$ 18.90</h6>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium btn-add css-sghohy-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
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
                      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddNewOrder;
