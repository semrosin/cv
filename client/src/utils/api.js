export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
