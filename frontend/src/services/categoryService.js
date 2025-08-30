import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/categories";

const categoryService = {
  // Create a category
  createCategory: async (categoryData) => {
    const response = await axios.post(API_BASE_URL, categoryData);
    return response.data;
  },

  // Get all categories
  getAllCategories: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Update a category
  updateCategory: async (id, categoryData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, categoryData);
    return response.data;
  },

  // Delete a category
  deleteCategory: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};

export default categoryService;
