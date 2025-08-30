import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/orders";

const orderService = {
  // Create an Order\
  createOrder: async (orderData) => {
    const response = await axios.post(API_BASE_URL, orderData);
    return response.data;
  },

  // Get All Orders

  getAllOrders: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get Order by ID
  getOrderById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Get Orders by User ID
  getOrdersByUserId: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  },

  // Update Order Status
  updateOrderStatus: async (id, status) => {
    const response = await axios.put(`${API_BASE_URL}/${id}/status`, {
      status,
    });
    return response.data;
  },

  // Delete Order
  deleteOrder: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};

export default orderService;
