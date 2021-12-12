const store = require('./storage');

let images = new store.DataStore('uploads.txt');

function createNewUpload(username, filePath, originalFileName, caption){
  let newUpload = {
    username: username,
    path: filePath,
    filename: originalFileName,
    caption: caption
  };

  images.push(newUpload);
}

function getUploadedFiles(username){
  return images.getAll();
}

module.exports = {
  createNewUpload: createNewUpload,
  getUploadedFiles: getUploadedFiles,
}
