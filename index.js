const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(cookieParser());

const port = 3000;


const fs = require('fs');
const path = require('path');
const handlebars = require("handlebars");

function html(fileName, data){
  let targetFile = path.join('html', fileName);
  let exist = fs.existsSync(targetFile)
  if(exist){
    let content = fs.readFileSync(targetFile, 'utf-8');
    const template = handlebars.compile(content);
    return template(data);
  }

  return `File not found ${fileName}`;
}

app.get('/', function(req, res){
  let followers = ['alice', 'bob', 'charlie'].join(',');
  let data = {
    name: 'Bob',
    followerCount: 20,
    followingCount: 20,
    followers: followers
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