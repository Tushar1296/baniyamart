import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/products";

const productService = {
  // Create a product
  createProduct: async (productData) => {
    const response = await axios.post(API_BASE_URL, productData);
    return response.data;
  },

  // Get all products
  getAllProducts: async () => {
    // Fetch
    // const response = await fetch("/api/products");
    // const data = await response.json(); // Extra step needed

    // Get
    const response = await axios.get(API_BASE_URL);
    console.log(response.data);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Get products by category
  getProductByCategory: async (categoryId) => {
    const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await axios.get(`${API_BASE_URL}/featured`);
    return response.data;
  },

  // Search a product
  searchProducts: async (keyword) => {
    const response = await axios.get(
      `${API_BASE_URL}/search?keyword=${keyword}`
    );
    return response.data;
  },

  // Update a product
  updateProduct: async (id, productData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};

export default productService;
