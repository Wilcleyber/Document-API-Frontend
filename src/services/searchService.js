const API_URL = "https://document-api-backend.onrender.com/search";

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
  "Content-Type": "application/json"
});

export const searchService = {
  // GET /search?query=termo
  async globalSearch(query) {
    if (!query) return { results: [] };
    const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeader()
    });
    return res.json();
  }
};