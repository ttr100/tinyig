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

function handlebarRender(content, data){
  const renderer = handlebars.compile(content);
  return renderer(data);
}

function registerHtmlPartial(partialName, fileName){
  let targetFile = path.join('html/partials', fileName);
  let content = fs.readFileSync(targetFile, 'utf-8');

  handlebars.registerPartial(partialName, content)
}

function html(fileName, data){
  let targetFile = path.join('html', fileName);
  let exist = fs.existsSync(targetFile)
  if(exist){
    registerHtmlPartial('headPartial', 'head.html');
    let content = fs.readFileSync(targetFile, 'utf-8');
    return handlebarRender(content, data);
  }

  return `File not found ${fileName}`;
}

app.get('/', function(req, res){
  let followers = [
    {name: 'alice', id: 1},
    {name: 'bob', id: 2},
    {name: 'charlie', id: 3}
  ]

  let followerCount = 0;
  let data = {
    name: 'Bob',
    followerCount: followerCount,
    followingCount: 20,
    hasFollower: followerCount > 0,
    followersList: followers
  }
  let response = html('index.html', data)
  res.send(response);
})

app.get('/register', function(req, res){
  let response = html('register.html')
  res.send(response);
})

let users = [];
app.post('/register', function(req, res){
  users.push(req.body);
  res.redirect('/');
})

app.post('/login', function(req, res){
  // do login
})

app.get('/home', function(req, res){
  res.send('Welcome, registered user')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})