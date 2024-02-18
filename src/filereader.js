const fs = require("fs");
const path = require("path");

const getAllFiles = (folderPath) => {
  let response = [];

  try {
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Directory ${folderPath} does not exist.`);
    }
    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach((file) => {
      const fullFilePath = path.join(folderPath, file);
      if (fs.statSync(fullFilePath).isDirectory()) {
        response = response.concat(getAllFiles(fullFilePath));
      } else {
        response.push(fullFilePath);
      }
    });
    return response;
  } catch (error) {
    console.error("Error reading directory:", error.message);
    return [];
  }
};

module.exports = { getAllFiles };
