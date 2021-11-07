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
const users = require('./users');

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
  if(req.cookies.loggedInUser){
    res.redirect('/home')
    return
  }

  let errorMessage = req.cookies.errorMessage;
  res.clearCookie('errorMessage');
  let data = {
    errorMessage: errorMessage
  }
  let response = html('index.html', data)
  res.send(response);
})

app.get('/register', function(req, res){
  let response = html('register.html')
  res.send(response);
})

app.post('/register', function(req, res){
  let user = users.registerUser(req.body.username, req.body.password);

  if(user){
    res.cookie('loggedInUser', user.username)
    res.redirect('/');
  }
  else{
    res.cookie('errorMessage', 'Unable to register')
    res.redirect('/register');
  }
})

app.post('/login', function(req, res){
  let user = users.authenticateUser(req.body.loginusername, req.body.loginpassword)
  if(user){
    res.cookie('loggedInUser', user.username);
    res.redirect('/home')
    return;
  }
  else{
    res.cookie('errorMessage', 'Unable to login')
    res.redirect('/')
  }
})

app.get('/home', function(req, res){
  if(!req.cookies.loggedInUser){
    res.cookie('errorMessage', 'Please login first')
    res.redirect('/')
    return
  }
  let data = {
    currentUser : req.cookies.loggedInUser
  }
  let content = html('home.html', data)
  res.send(content)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
