
let images = [];

function createNewUpload(username, filePath, originalFileName, caption){
  let newUpload = {
    path: filePath,
    filename: originalFileName,
    caption: caption
  };
  images.push(newUpload);
}

function getUploadedFiles(username){
  return images;
}

module.exports = {
  createNewUpload: createNewUpload,
  getUploadedFiles: getUploadedFiles,
}
