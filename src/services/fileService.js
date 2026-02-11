const API_URL = "https://document-api-backend.onrender.com/files";

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
  "Content-Type": "application/json"
});

export const fileService = {
  // GET /files/:folderName?sort=name
  async getFiles(folderName, sort = "name") {
    const res = await fetch(`${API_URL}/${folderName}?sort=${sort}`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  // GET /files/:folderName/:fileName
  async getFileContent(folderName, fileName) {
    const res = await fetch(`${API_URL}/${folderName}/${fileName}`, {
      headers: getAuthHeader()
    });
    return res.json();
  },

  // POST /files/:folderName (Admin)
  async createFile(folderName, fileData) {
    const res = await fetch(`${API_URL}/${folderName}`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(fileData)
    });
    return res.json();
  }
};