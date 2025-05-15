type Item = {
  id: string;
  quantity: string;
  price: string;
};

type FormProps = {
  token: string;
  totalPrice: number;
  phoneNumber: string;
  emailAddress: string;
  items: Item[];
  successURL: string;
  failureURL: string;
  webHookURL: string;
  orderId: string;
  currencyType: string;
  userName: string;
  merchantId: number;
  merchantName: string;
  generatedDateTime: string;
  formSubmitButtonRef: React.RefObject<HTMLButtonElement>;
};

function PayFastForm({
  token,
  totalPrice,
  phoneNumber,
  emailAddress,
  items = [],
  successURL,
  failureURL,
  webHookURL,
  orderId,
  currencyType,
  userName,
  merchantId,
  merchantName,
  generatedDateTime,
  formSubmitButtonRef,
}: FormProps) {
  return (
    <form
      className="hidden"
      action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
      method="POST"
    >
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <input name="MERCHANT_ID" value={merchantId} />
        <input name="MERCHANT_NAME" value={merchantName} />
        <input name="PROCCODE" value="00" />
        <input name="TOKEN" value={token} />
        <input name="TXNAMT" value={totalPrice} />
        <input name="CUSTOMER_MOBILE_NO" value={phoneNumber} />
        <input name="CUSTOMER_EMAIL_ADDRESS" value={emailAddress} />
        {items.map((item, index) => (
          <>
            <input name={`ITEMS[${index}][SKU]`} value={item.id} />
            <input name={`ITEMS[${index}][PRICE]`} value={item.price} />
            <input name={`ITEMS[${index}][QTY]`} value={item.quantity} />
          </>
        ))}
        <input
          name="SIGNATURE"
          value="THIS REQUEST IS SENT BY LAUNDREZ WEB APP"
        />
        <input name="VERSION" value="0.0.1" />
        <input name="SUCCESS_URL" value={successURL} />
        <input name="FAILURE_URL" value={failureURL} />
        <input name="BASKET_ID" value={orderId} />
        <input name="ORDER_DATE" value={generatedDateTime.split('T')[0]} />
        <input name="CHECKOUT_URL" value={webHookURL} />
        <input name="MERCHANT_CUSTOMER_ID" value={orderId} />
        <input name="CURRENCY_CODE" value={currencyType} />
        <input name="CUSTOMER_NAME" value={userName} />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        ref={formSubmitButtonRef}
      >
        Submit
      </button>
    </form>
  );
}

export default PayFastForm;
