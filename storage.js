const fs = require('fs');

class DataStore {
  constructor(filename){
    this.filename = filename;
    this.data = [];

    if(fs.existsSync(this.filename)){
      let fileContent = fs.readFileSync(this.filename, 'utf-8');
      let parsedData = JSON.parse(fileContent);
      this.data = parsedData.data;
    }
  }

  push(newEntry){
    this.data.push(newEntry);
    let objectToStore = {
      data: this.data
    }

    let stringToStore = JSON.stringify(objectToStore);
    fs.writeFileSync(this.filename, stringToStore);
  }

  getAll(){
    return this.data;
  }
}

module.exports = {
  DataStore: DataStore
}
