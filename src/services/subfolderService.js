const API_URL = "https://document-api-backend.onrender.com/subfolders";

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
  "Content-Type": "application/json"
});

export const subfolderService = {
  // GET /subfolders/:folderName
  async getSubfolders(folderName) {
    const res = await fetch(`${API_URL}/${folderName}`, { headers: getAuthHeader() });
    return res.json();
  },

  // POST /subfolders/:folderName
  async createSubfolder(folderName, subName) {
    const res = await fetch(`${API_URL}/${folderName}`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ name: subName })
    });
    return res.json();
  },

  // DELETE /subfolders/:folderName/:subfolderName
  async deleteSubfolder(folderName, subName) {
    const res = await fetch(`${API_URL}/${folderName}/${subName}`, {
      method: "DELETE",
      headers: getAuthHeader()
    });
    return res.json();
  }
};