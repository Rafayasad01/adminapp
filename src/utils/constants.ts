//export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
export const BASE_URL = 'https://dev.urapptech.com/api/v1/admin/';
export const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
export const BACKOFFICE_PREFIX = 'backofficeUser';
export const PERMISSION_PREFIX = 'permission';
export const ORDER_PREFIX = 'order';
export const CART_PREFIX = 'cart';
export const DRIVER_PREFIX = 'driver';
export const CUSTOMER_PREFIX = 'customer';
export const CATEGORY_PREFIX = 'category';
export const SETTING_PREFIX = 'setting';
export const NOTIFICATION_PREFIX = 'notification';
export const TENANT_PREFIX = 'tenant';
export const ORDER_STATUS_NEW = 'New';
export const ORDER_STATUS_PICKED_UP = 'PickedUp';
export const ORDER_STATUS_PROCESSING = 'Processing';
export const ORDER_STATUS_IN_DELIVERY = 'In-Delivery';
export const ORDER_STATUS_IN_DELIVERED = 'Delivered';
export const ORDER_STATUS_IN_CANCELLED = 'Cancelled';
export const ORDER_STATUS_PENDING = 'Pending';
export const CART_STATUS_NEW = 'New';
export const CART_STATUS_PROCESSING = 'Processing';
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
// LocalStorage my token save kara lyty
export const TOKEN_STORE_KEY = 'APP_AUTH_TOKEN';
export const setToken = (data: string) => {
  localStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(data));
};

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
