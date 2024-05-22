import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

// const HOST = 'https://dev.urapptech.com';
const HOST = 'http://192.168.8.68:3200';
// const HOST = 'http://192.168.8.97:3200';
// const HOST = 'http://localhost:3200';

export const BASE_URL = `${HOST}/api/v1/admin/`;
export const BASE_SYSTEM_URL = `${HOST}/api/v1/system/config/`;
export const MODULE_EMPLOYEES = 'Employees';
export const RATING = 'rating';
export const FAQ = 'faq';
export const EMPLOYEE_PREFIX = 'employee';
export const PROFILE_PREFIX = 'profile';
export const THEME_PREFIX = 'theme';
export const APPOINTMENT_PREFIX = 'appointment';
export const BACKOFFICE_PREFIX = 'backofficeUser';
export const PERMISSION_PREFIX = 'permission';
export const DASHBOARD_PREFIX = 'dashboard';
export const ORDER_PREFIX = 'order';
export const CART_PREFIX = 'cart';
export const DRIVER_PREFIX = 'driver';
export const CUSTOMER_PREFIX = 'customer';
export const CATEGORY_PREFIX = 'category';
export const SERVICE_PREFIX = 'service';
export const ATTENDANCE_PREFIX = 'attendance';
export const STORE_PREFIX = 'store';
export const SETTING_PREFIX = 'setting';
export const NOTIFICATION_PREFIX = 'notification';
export const TENANT_PREFIX = 'tenant';
export const ROLE_PREFIX = 'role';
export const SHOP_PREFIX = 'shop';
export const APP_IMAGE_PREFIX = 'appImage';

export const APP_USER_STATUS_OFFLINE = 'Offline';
export const APP_USER_STATUS_ONLINE = 'Online';
export const OFFICE_MAP_LAT = 24.8758795;
export const OFFICE_MAP_LNG = 67.0878445;
export const OFFICE_MAP_LABEL = 'UrApp Technologies';
export const OFFICE_MAP_ADDRESS =
  'Sumya Business Avenue, 9 B, Mohammad Ali Society Muhammad Ali Chs (Machs), Karachi, Karachi City, Sindh, Pakistan';

export const CART_STATUS = {
  NEW: 'New',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
} as const;

export const APPOINTMENT_STATUS = {
  NEW: 'New',
  RESCHEDULE: 'Reschedule',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DONE: 'Done',
  PENDING: 'Pending',
  MISSED: 'Missed',
} as const;

export const NOTIFICATION_STATUS = {
  NEW: 'New',
  SENDING: 'Sending',
  FAILED: 'Failed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const SOCIAL_MEDIA = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  YOUTUBE: 'youtube',
  WHATSAPP: 'whatsapp',
} as const;
export const DOMAIN_PREFIX = '.urapptech.com';
export const DOMAIN_PROTOCOL = 'https://';
export const NOT_AUTHORIZED_MESSAGE = 'You dont have permission for this.';
export const TOKEN_STORE_KEY = 'APP_AUTH_TOKEN';
export const SYSTEM_CONFIG_PREFIX = 'theme';
export const SHOP_SCHEDULING_PREFIX = 'shop-schedule';
export const CURRENCY_PREFIX = '$';

let TEXT_STORE_KEY = '';
export const setText = (text: string) => {
  TEXT_STORE_KEY = text;
};
export { TEXT_STORE_KEY };

export const ORDER_STATUS = {
  NEW: 'New',
  // DRIVER_ASSIGNED_FOR_ITEM_PICKUP: 'Driver-Assigned-For-Item-Pickup',
  // DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER:
  //   'Driver-Accepted-To-Pick-Up-Item-From-Customer',
  // DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER: 'Driver-Picked-Up-Item-From-Customer',
  // DRIVER_DELIVERED_ITEM_TO_SHOP: 'Driver-Delivered-Item-To-Shop',
  // DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER:
  //   'Driver-Declined-To-Pickup-Item-From-Customer',
  // DRIVER_RETURNED_ITEM_TO_CUSTOMER: 'Driver-Returned-Item-To-Customer',
  PROCESSING_ITEM: 'Processing-Item',
  // DRIVER_ASSIGNED_FOR_ITEM_DELIVERY: 'Driver-Assigned-For-Item-Delivery',
  // DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP:
  //   'Driver-Accepted-To-Pick-Up-Item-From-Shop',
  // DRIVER_PICKED_UP_ITEM_FROM_SHOP: 'Driver-Picked-Up-Item-From-Shop',
  // DRIVER_DELIVERED_ITEM_TO_CUSTOMER: 'Driver-Delivered-Item-To-Customer',
  // DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP:
  //   'Driver-Declined-To-Pickup-Item-From-Shop',
  // DRIVER_RETURNED_ITEM_TO_SHOP: 'Driver-Returned-Item-To-Shop',
  // CUSTOMER_PICK_UP: 'Customer-Pick-Up',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const ORDER_STATUSES = new Map([
  [
    ORDER_STATUS.NEW,
    {
      status: ORDER_STATUS.NEW,
      title: 'Order Received',
      color: 'text-cyan-500',
      background: 'bg-cyan-500',
      text: 'you have have received an order',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 10,
    },
  ],
  /* [
    ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP,
    {
      status: ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_PICKUP,
      title: 'Pickup Driver Assigned',
      color: 'text-cyan-500',
      background: 'bg-cyan-500',
      text: 'you have assigned driver for items pickup',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 20,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
      title: 'Driver Accepted To Pickup',
      color: 'text-sky-500',
      background: 'bg-sky-500',
      text: 'the driver has accepted to pickup items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 30,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
      title: 'Driver Pickup Items',
      color: 'text-blue-500',
      background: 'bg-blue-500',
      text: 'driver has customers items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER,
      title: 'Driver Declined Items',
      color: 'text-indigo-500',
      background: 'bg-indigo-500',
      text: 'driver has returned items to customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
      title: 'Driver Returned Items',
      color: 'text-indigo-500',
      background: 'bg-indigo-500',
      text: 'driver has returned items to customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP,
    {
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_SHOP,
      title: 'Driver Delivered Item To Shop',
      color: 'text-indigo-500',
      background: 'bg-indigo-500',
      text: 'driver has delivered items to shop',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 50,
    },
  ], */
  [
    ORDER_STATUS.PROCESSING_ITEM,
    {
      status: ORDER_STATUS.PROCESSING_ITEM,
      title: 'Processing Items',
      color: 'text-fuchsia-500',
      background: 'bg-fuchsia-500',
      text: 'items are processing',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 60,
    },
  ],
  /* [
    ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY,
    {
      status: ORDER_STATUS.DRIVER_ASSIGNED_FOR_ITEM_DELIVERY,
      title: 'Delivery Driver Assigned',
      color: 'text-fuchsia-500',
      background: 'bg-fuchsia-500',
      text: 'you have assigned driver for items delivery',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 70,
    },
  ], */
  /*  [
    ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP,
      title: 'Driver Declined Items',
      color: 'text-indigo-500',
      background: 'bg-indigo-500',
      text: 'driver has returned items to customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 70,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP,
    {
      status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_SHOP,
      title: 'Driver Returned Items',
      color: 'text-indigo-500',
      background: 'bg-indigo-500',
      text: 'driver has returned items to customer',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 70,
    },
  ], */
  /*  [
    ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
      title: 'Driver Accepted To Deliver',
      color: 'text-fuchsia-500',
      background: 'bg-fuchsia-500',
      text: 'driver has accepted to deliver items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 80,
    },
  ], */
  /*  [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
      title: 'Driver Deliver Items',
      color: 'text-pink-500',
      background: 'bg-pink-500',
      text: 'driver has customers items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 90,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
      title: 'Delivered',
      color: 'text-rose-500',
      background: 'bg-rose-500',
      text: 'driver has delivered items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ], */
  /*  [
    ORDER_STATUS.CUSTOMER_PICK_UP,
    {
      status: ORDER_STATUS.CUSTOMER_PICK_UP,
      title: 'Items Ready',
      color: 'text-green-500',
      background: 'bg-green-500',
      text: 'Items are ready for customers to pick up',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 90,
    },
  ], */
  [
    ORDER_STATUS.COMPLETED,
    {
      status: ORDER_STATUS.COMPLETED,
      title: 'Order Completed',
      color: 'text-amber-500',
      background: 'bg-amber-500',
      text: 'order has been completed',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
  [
    ORDER_STATUS.CANCELLED,
    {
      status: ORDER_STATUS.CANCELLED,
      title: 'Order Canceled',
      color: 'text-red-500',
      background: 'bg-red-500',
      text: 'the order has been canceled',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
]);

export const ORDER_FULFILLMENT_METHOD = {
  DELIVERY: 'Delivery',
  SELF: 'Self',
} as const;

export const weekDays = [
  { id: 'Sunday', name: 'Sunday' },
  { id: 'Monday', name: 'Monday' },
  { id: 'Tuesday', name: 'Tuesday' },
  { id: 'Wednesday', name: 'Wednesday' },
  { id: 'Thursday', name: 'Thursday' },
  { id: 'Friday', name: 'Friday' },
  { id: 'Saturday', name: 'Saturday' },
];

// patterns
export const PATTERN = {
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9\s.@]+$/,
  CHAR_NUM_DOT_AT: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // used for email fields
  CHAR_SPACE_DASH: /^[A-Za-z\s-]+$/, // used for textfield fields
  CHAR_NUM_SPACE_DASH: /^[A-Za-z0-9\s-]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[A-Za-z0-9\s@.,#()-]+$/, // used for textfield address
  CHAR_SPEC_NUM_DASH: /^[A-Za-z0-9\s@$.%!,#()-]+$/, // used for textfield address
  CHAR_NUM_DASH: /^[A-Za-z0-9-]+$/, // used for only num,chars,dash like; postal code
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[^\s]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  ONLY_NUM: /^\d+$/, // used for string type text
  ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
};

export const MAX_LENGTH_EXCEEDED = 'Maximum length exceeded';
export const INVALID_CHAR = 'Invalid characters';
export const PASSWORD_SHOULD_SAME = 'Password must same to the new one.';
export const PH_MINI_LENGTH = 'Minimum length should be 15';

export const VALIDATE_NON_NEGATIVE_NUM = (value: any) => {
  return parseInt(value, 10) >= 0 || 'Must be a non-negative number';
};

export const VALIDATE_NON_NEGATIVE_NUM_AND_CHECK_LENGTH = (
  value: any,
  length: number
) => {
  const parsedValue = parseInt(value, 10);

  if (parsedValue >= 0 && parsedValue > length) {
    return true; // Validation passes
  }
  if (parsedValue < 0) {
    return 'Must be a non-negative number';
  }
  return `Must be greater than ${length}`;
};

export const imageAllowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const THEME_COLORS = [
  'primary',
  'background',
  'foreground',
  'secondary',
  'faded',
  'secondary2',
];

export const CATEGORY_COLORS_COUNT = 6;
export const BANNER_TYPE = [
  {
    id: 'Slider',
    name: 'Slider',
  },
  {
    id: 'Onboard',
    name: 'On Board',
  },
  {
    id: 'Splash',
    name: 'Splash Screen',
  },
];

export const APPOINTMENT_TYPE = [
  {
    id: 'allAppointments',
    name: 'All Appointments',
    imageIcon: GroupsOutlinedIcon,
  },
  {
    id: 'individualAppointment',
    name: 'Individual Appointment',
    imageIcon: PersonOutlinedIcon,
  },
];

export const BARBER_SERVICES = [
  {
    id: 'slider',
    name: 'Slider',
  },
  {
    id: 'onboard',
    name: 'On Board',
  },
  {
    id: 'splash',
    name: 'Splash Screen',
  },
];

export const BARBER_SERVICES_AMOUNT = [
  {
    id: 'Percentage',
    name: 'Percentage',
  },
  {
    id: 'Amount',
    name: 'Amount',
  },
];

export const GENDER = [
  {
    id: 'Male',
    name: 'Male',
  },
  {
    id: 'Female',
    name: 'Female',
  },
  {
    id: 'Other',
    name: 'Other',
  },
];
