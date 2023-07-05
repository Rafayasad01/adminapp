export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
//export const BASE_URL = "https://dev.urapptech.com/api/v1/admin/";
export const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
export const BACKOFFICE_PREFIX = 'backofficeUser';
export const PERMISSION_PREFIX = 'permission'
export const ORDER_PREFIX = 'order'
export const CART_PREFIX = 'cart'
export const ORDER_STATUS_NEW = "New";
export const ORDER_STATUS_PENDING = "Pending";
export const ORDER_STATUS_PROCESSING = "Processing";
export const ORDER_STATUS_IN_DELIVERY = "In-Delivery";
export const ORDER_STATUS_IN_DELIVERED = "Delivered";
export const ORDER_STATUS_IN_CANCELLED = "Cancelled";
export let token = "";
export const setToken = (data: string) => {
    token = data;
}

export const ORDER_STATUSES = new Map();
ORDER_STATUSES.set(ORDER_STATUS_NEW, {
    'title': 'Placed Order',
    'color': 'text-blue-500',
    'text': 'We have received your order',
    'iconText': 'AssignmentTurnedInOutlinedIcon'
});
ORDER_STATUSES.set(ORDER_STATUS_PENDING, {
    'title': 'Order Picked Up',
    'color': 'text-purple-500',
    'text': 'Your order has been collected',
    'iconText': 'FilterNoneOutlinedIcon'
});
ORDER_STATUSES.set(ORDER_STATUS_PROCESSING, {
    'title': 'Order In Progress',
    'color': 'text-green-500',
    'text': 'Your order is in progress',
    'iconText': 'LocationOnOutlinedIcon'
});
ORDER_STATUSES.set(ORDER_STATUS_IN_DELIVERY, {
    'title': 'Order Drop Off',
    'color': 'text-neutral-500',
    'text': 'Your order has been dropped',
    'iconText': 'DomainVerificationOutlinedIcon'
});
ORDER_STATUSES.set(ORDER_STATUS_IN_DELIVERED, {
    'title': 'Order Delivered',
    'color': 'text-neutral-500',
    'text': 'Your order has been delivered',
    'iconText': 'AccessTimeIcon'
});
ORDER_STATUSES.set(ORDER_STATUS_IN_CANCELLED, {
    'title': 'Order Cancelled',
    'color': 'text-neutral-500',
    'text': 'Your order has been cancelled',
    'iconText': 'DomainVerificationOutlinedIcon'
});

