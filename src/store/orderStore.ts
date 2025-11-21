export const userOrderStore = defineStore("orderStore", () => {
  const orders = ref<any[]>([
    {
      orderId: "6786",
      customer: "John Doe",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Completed",
    },

    {
      orderId: "6787",
      customer: "james Smith",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Preparing",
    },
    {
      orderId: "6788",
      customer: "Ali Haider",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Received",
    },
    {
      orderId: "6789",
      customer: "Imran Ali",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Completed",
    },
    {
      orderId: "6790",
      customer: "james Smith",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Received",
    },
    {
      orderId: "6791",
      customer: "Ali Haider",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Received",
    },
    {
      orderId: "6792",
      customer: "Imran Ali",
      totalAmount: "$12.67",
      address: "Lahore",
      itemSummary: "2 Large Pizza",
      dateTime: "Jan 15 12:12 PM",
      payment: "Not Paid",
      orderStatus: "Received",
    },
  ]);

  return { orders };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(userOrderStore, import.meta.hot));
}
