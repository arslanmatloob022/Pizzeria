export const superAdminColumns = [
  { key: "uuid", label: "UUID" },
  { key: "restaurantName", label: "Restaurant Name" },
  { key: "phoneNo", label: "Phone No" },
  { key: "address", label: "Address" },
  { key: "squareAccountStatus", label: "Square Account Status" },
  { key: "status", label: "Status" },
];

export const adminCategoriesColumns = [
  { key: "uuid", label: "UUID" },
  { key: "companyName", label: "Company Name" },
  { key: "description", label: "Description" },
  { key: "status", label: "status" },
];

export const adminMenuColumns = [
  { key: "uuid", label: "UUID" },
  { key: "dishName", label: "Dish Name" },
  { key: "price", label: "Price" },
  { key: "description", label: "Description" },
  { key: "tiktokVideo", label: "Tik Tok Video" },
  { key: "instaVideo", label: "Insta Video" },
  { key: "position", label: "Position" },
  { key: "status", label: "Status" },
];

export const orderColumns = [
  { key: "orderId", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "address", label: "Address" },
  { key: "itemSummary", label: "item Summary" },
  { key: "dateTime", label: "Date/Time" },
  { key: "payment", label: "Payment" },
  { key: "orderStatus", label: "Status" },
];

// Order Status Options
export const orderStatusOptions = [
  { value: "Received", label: "Received", color: "bg-blue-500" },
  { value: "Preparing", label: "Preparing", color: "bg-orange-500" },
  { value: "Completed", label: "Completed", color: "bg-green-500" },
];

// Order Status Values
export const ORDER_STATUS = {
  RECEIVED: 'Received',
  PREPARING: 'Preparing', 
  COMPLETED: 'Completed',
} as const;
