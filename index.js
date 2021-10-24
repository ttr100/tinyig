const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(cookieParser());

const port = 3000;


const fs = require('fs');
const path = require('path');

function html(fileName, data){
  let targetFile = path.join('html', fileName);
  let exist = fs.existsSync(targetFile)
  if(exist){
    let content = fs.readFileSync(targetFile, 'utf-8');
    let keys = Object.keys(data);
    for(let i=0;i<keys.length;i++){
      let currentKey = keys[i]; // name
      let replacementKey = `#${currentKey}#` // #name#
      let value = data[currentKey]; // 'Alice'
      content = content.replace(replacementKey, value);
    }
    return content
  }

  return `File not found ${fileName}`;
}

app.get('/', function(req, res){
  let data = {
    name: 'Bob',
    followerCount: 20,
    followingCount: 20
  }
  let response = html('index.html', data)
  res.send(response);
})

app.get('/register', function(req, res){
  let response = html('register.html')
  res.send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})