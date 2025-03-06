import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const HOST = 'https://dev.urapptech.com';
// const HOST = 'http://192.168.8.68:3200';
// const HOST = 'http://192.168.8.97:3200';

export const BASE_URL =
  import.meta.env.VITE_BASE_URL || `${HOST}/api/v1/admin/`;
export const BASE_SYSTEM_URL =
  import.meta.env.VITE_SYSTEM_BASE_URL || `${HOST}/api/v1/system/config/`;
export const STAFF_APP_BASE_URL =
  import.meta.env.VITE_STAFF_APP_BASE_URL || `${HOST}/api/v1/staff-app/`;

// export const BASE_URL = `${HOST}/api/v1/admin/`;
// export const BASE_SYSTEM_URL = `${HOST}/api/v1/system/config/`;
export const MODULE_EMPLOYEEES = 'Employees';
export const RATING = 'rating';
export const FAQ = 'faq';
export const PROFILE_PREFIX = 'profile';
export const THEME_PREFIX = 'theme';
export const APPOINTMENT_PREFIX = 'appointment';
export const BACKOFFICE_PREFIX = 'back-office-user';
export const PERMISSION_PREFIX = 'permission';
export const DASHBOARD_PREFIX = 'dashboard';
export const ORDER_PREFIX = 'order';
export const CART_PREFIX = 'cart';
export const DRIVER_PREFIX = 'driver';
export const CUSTOMER_PREFIX = 'customer';
export const CATEGORY_PREFIX = 'category';
export const SETTING_PREFIX = 'setting';
export const NOTIFICATION_PREFIX = 'notification';
export const TENANT_PREFIX = 'tenant';
export const ROLE_PREFIX = 'role';
export const SHOP_PREFIX = 'shop';
export const APP_IMAGE_PREFIX = 'appImage';
export const ORDER_STATUS_NEW = 'New';
export const ORDER_STATUS_PICKED_UP = 'PickedUp';
export const ORDER_STATUS_PROCESSING = 'Processing';
export const ORDER_STATUS_IN_DELIVERY = 'In-Delivery';
export const ORDER_STATUS_IN_DELIVERED = 'Delivered';
export const ORDER_STATUS_IN_CANCELLED = 'Cancelled';
export const ORDER_STATUS_PENDING = 'Pending';
export const CART_STATUS_NEW = 'New';
export const CART_STATUS_PROCESSING = 'Processing';
export const CART_STATUS_COMPELETED = 'Completed';
export const ORDER_DELIVERY_STATUS_NOT_ASSIGN = 'Not Assign';
export const ORDER_DELIVERY_STATUS_NEW = 'New';
export const ORDER_DELIVERY_STATUS_PICKED_UP = 'PickedUp';
export const ORDER_DELIVERY_STATUS_IN_DELIVERY = 'In-Delivery';
export const ORDER_DELIVERY_STATUS_DELIVERED = 'Delivered';
export const ORDER_DELIVERY_STATUS_CANCELLED = 'Cancelled';
export const ORDER_DELIVERY_STATUS_ACCEPTED = 'Accepted';
export const APP_USER_STATUS_OFFLINE = 'Offline';
export const APP_USER_STATUS_ONLINE = 'Online';
export const OFFICE_MAP_LAT = 24.8758795;
export const OFFICE_MAP_LNG = 67.0878445;
export const OFFICE_MAP_LABEL = 'UrApp Technologies';
export const OFFICE_MAP_ADDRESS =
  'Sumya Business Avenue, 9 B, Mohammad Ali Society Muhammad Ali Chs (Machs), Karachi, Karachi City, Sindh, Pakistan';
export const NOTIFICATION_STATUS_NEW = 'New';
export const NOTIFICATION_STATUS_SENDING = 'Sending';
export const NOTIFICATION_STATUS_FAILED = 'Failed';
export const NOTIFICATION_STATUS_COMPLETED = 'Completed';
export const NOTIFICATION_STATUS_CANCELLED = 'Cancelled';
export const FACEBOOK = 'facebook';
export const INSTAGRAM = 'instagram';
export const LINKEDIN = 'linkedin';
export const TWITTER = 'twitter';
export const YOUTUBE = 'youtube';
export const WHATSAPP = 'whatsapp';
export const DOMAIN_PREFIX = '.urapptech.com';
export const DOMAIN_PROTOCOL = 'https://';
export const NOT_AUTHORIZED_MESSAGE = 'You dont have permission for this.';
export const TOKEN_STORE_KEY = 'APP_AUTH_TOKEN';
export const SYSTEM_CONFIG_PREFIX = 'theme';

let TEXT_STORE_KEY = '';
export const setText = (text: string) => {
  TEXT_STORE_KEY = text;
};
export { TEXT_STORE_KEY };

export const ORDER_STATUSES = new Map();
ORDER_STATUSES.set(ORDER_STATUS_NEW, {
  title: 'Placed Order',
  color: 'text-blue-500',
  text: 'We have received your order',
  iconText: 'AssignmentTurnedInOutlinedIcon',
});
ORDER_STATUSES.set(ORDER_STATUS_PICKED_UP, {
  title: 'Order Picked Up',
  color: 'text-purple-500',
  text: 'Your order has been collected',
  iconText: 'FilterNoneOutlinedIcon',
});
ORDER_STATUSES.set(ORDER_STATUS_PROCESSING, {
  title: 'Order In Progress',
  color: 'text-green-500',
  text: 'Your order is in progress',
  iconText: 'LocationOnOutlinedIcon',
});
ORDER_STATUSES.set(ORDER_STATUS_IN_DELIVERY, {
  title: 'Order Drop Off',
  color: 'text-orange-500',
  text: 'Your order has been dropped',
  iconText: 'DomainVerificationOutlinedIcon',
});
ORDER_STATUSES.set(ORDER_STATUS_IN_DELIVERED, {
  title: 'Order Delivered',
  color: 'text-yellow-500',
  text: 'Your order has been delivered',
  iconText: 'AccessTimeIcon',
});
ORDER_STATUSES.set(ORDER_STATUS_IN_CANCELLED, {
  title: 'Order Cancelled',
  color: 'text-red-500',
  text: 'Your order has been cancelled',
  iconText: 'DomainVerificationOutlinedIcon',
});
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
  CHAR_NUM_DOT_AT: /^[\s\S]+$/, // used for email fields
  CHAR_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  CHAR_NUM_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[\s\S]+$/, // used for textfield address
  CHAR_SPEC_NUM_DASH: /^[\s\S]+$/, // used for textfield address
  CHAR_NUM_DASH: /^[\s\S]+$/, // used for only num,chars,dash like; postal code
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[\s\S]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  ONLY_NUM: /^\d+$/, // used for string type text
  ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
  HOURS_MINTS_FORMAT: /^([0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,

  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9\s.@]+$/,
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // used for email fields
  // CHAR_SPACE_DASH: /^[A-Za-z\s-]+$/, // used for textfield fields
  // CHAR_NUM_SPACE_DASH: /^[A-Za-z0-9\s-]+$/, // used for textfield fields
  // ADDRESS_ONLY: /^[A-Za-z0-9\s@.,#()-]+$/, // used for textfield address
  // CHAR_SPEC_NUM_DASH: /^[A-Za-z0-9\s@$.%!,#()-]+$/, // used for textfield address
  // CHAR_NUM_DASH: /^[A-Za-z0-9-]+$/, // used for only num,chars,dash like; postal code
  // NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  // ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  // PASSWORD: /^[^\s]+$/,
  // NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  // PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  // ONLY_NUM: /^\d+$/, // used for string type text
  // ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  // POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  // CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  // CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
};

export const MAX_LENGTH_EXCEEDED = 'Maximum length exceeded';
export const INVALID_CHAR = 'Invalid characters';
export const PASSWORD_SHOULD_SAME = 'Password must same to the new one.';
export const PH_MINI_LENGTH = 'Minimum length should be 15';

export const imageAllowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

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

export const BARBER_SERVICES_AMOUNT = [
  {
    id: '1',
    name: '10',
  },
  {
    id: '2',
    name: '20',
  },
  {
    id: '3',
    name: '30',
  },
];
