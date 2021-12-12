const fs = require('fs');

let FILE_NAME = 'uploads.txt';
let images = [];

function storeToFile(data){
  let objectToStore = {
    uploads: data
  }

  let stringToStore = JSON.stringify(objectToStore);
  fs.writeFileSync(FILE_NAME, stringToStore);
}

function readFromFile(){
  if(fs.existsSync(FILE_NAME)){
    let fileContent = fs.readFileSync(FILE_NAME, 'utf-8');
    let parsedData = JSON.parse(fileContent);
    images = parsedData.uploads;
  }
}


function createNewUpload(username, filePath, originalFileName, caption){
  let newUpload = {
    username: username,
    path: filePath,
    filename: originalFileName,
    caption: caption
  };
  images.push(newUpload);
  storeToFile(images);
}

function getUploadedFiles(username){
  return images;
}

readFromFile();

module.exports = {
  createNewUpload: createNewUpload,
  getUploadedFiles: getUploadedFiles,
}
