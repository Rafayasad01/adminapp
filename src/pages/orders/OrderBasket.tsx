import React from 'react';
import TopBar from '../../components/common/TopBar';

const OrderBasket = () => {
  return (
    <>
      <TopBar isNestedRoute title="Order" />
      <div className="cart-page p-4 sm:p-5 xl:p-7">
        <div className="mb-4 flex items-center justify-start md:mb-6">
          <h4 className="page-heading">My Basket</h4>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="cart-products-card">
              <div className="overflow-x-auto">
                <table className="cart-products-table">
                  <thead className="border-b border-b-neutral-200 ">
                    <tr className="h-10">
                      <th>Products</th>
                      <th>Price</th>
                      <th>Items</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center gap-x-5">
                          <button
                            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium btn-delete css-78trlr-MuiButtonBase-root-MuiIconButton-root"
                            tabIndex={0}
                            type="button"
                          >
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root text-2xl"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              data-testid="DeleteOutlineOutlinedIcon"
                            >
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                            </svg>
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                          </button>
                          <div className="product">
                            <img className="pic" alt="" />
                            <p className="name">Trousers</p>
                          </div>
                        </div>
                      </td>
                      <td>$11.00</td>
                      <td>2.00</td>
                      <td>$22.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="my-2.5 flex items-center justify-between px-5">
                <div className="flex items-center">
                  <p className="promo-label">Add Promo Code</p>
                  <div className="MuiFormControl-root css-1nrlq1o-MuiFormControl-root">
                    <div className="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedStart promo-field css-1aa5qj0-MuiInputBase-root-MuiInput-root">
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionStart MuiInputAdornment-standard MuiInputAdornment-sizeSmall css-ittuaa-MuiInputAdornment-root text-orange-100">
                        <span className="notranslate">​</span>
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="DiscountIcon"
                        >
                          <path d="M12.79 21 3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z" />
                          <path d="M11.38 17.41c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.63.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41l7.79 7.79zM7.25 3c.69 0 1.25.56 1.25 1.25S7.94 5.5 7.25 5.5 6 4.94 6 4.25 6.56 3 7.25 3z" />
                        </svg>
                      </div>
                      <input
                        aria-invalid="false"
                        placeholder="Enter Promo Code"
                        type="text"
                        className="MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart css-nz481w-MuiInputBase-input-MuiInput-input"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit btn-add-more css-sbfmij-MuiButtonBase-root-MuiButton-root"
                  tabIndex={0}
                  type="button"
                >
                  <span className="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon">
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
                  Add More to Basket
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="cart-checkout-card">
              <div className="mb-5 w-full ">
                <div className="border-b-[2px] pb-2">
                  <h4 className="pb-[18px] text-[20px] font-semibold leading-[normal] text-[#1A1A1A]">
                    Payment
                  </h4>
                  <div className="flex items-center py-[12px]">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.2227 6.8877L8.22264 13.8877L5.2226 10.8877M19.2227 9.8877C19.2227 14.8583 15.1932 18.8877 10.2227 18.8877C5.25209 18.8877 1.22266 14.8583 1.22266 9.8877C1.22266 4.91713 5.25209 0.887695 10.2227 0.887695C15.1932 0.887695 19.2227 4.91713 19.2227 9.8877Z"
                          stroke="#1D1D1D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="ml-[12px] text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                      Cash on delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className="total-amount">
                <h5 className="heading">Total Amount</h5>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Total Amount</p>
                  <p className="value">$22.00</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Discount</p>
                  <p className="value">$0.00</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">HST 10%</p>
                  <p className="value">2.20</p>
                </div>
              </div>
              <div className="grand-total">
                <p className="key">Grand Total</p>
                <p className="value">$24.20</p>
              </div>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorInherit btn-checkout css-1y942vo-MuiButtonBase-root-MuiButton-root"
                tabIndex={0}
                type="button"
              >
                Proceed
                <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderBasket;
