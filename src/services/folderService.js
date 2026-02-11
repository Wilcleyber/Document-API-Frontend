const API_URL = "https://document-api-backend.onrender.com/folders";

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
  "Content-Type": "application/json"
});

export const folderService = {
  // POST /folders (Criação)
  async createFolder(name) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ name })
    });
    return res.json();
  },

  // DELETE /folders/:name (Exclusão)
  async deleteFolder(name) {
    const res = await fetch(`${API_URL}/${name}`, {
      method: "DELETE",
      headers: getAuthHeader()
    });
    return res.json();
  }
};