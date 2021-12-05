const users = require('./users');
const uploads = require('./uploads');
const html = require('./html');
const multer  = require('multer');

const express = require('express');
var cookieParser = require('cookie-parser')
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'))

const port = 3000;

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
  let response = html.render('index.html', data)
  res.send(response);
})

app.get('/register', function(req, res){
  let errorMessage = req.cookies.errorMessage;
  res.clearCookie('errorMessage');
  let data = {
    errorMessage: errorMessage
  }
  let response = html.render('register.html', data)
  res.send(response);
})

app.post('/register', function(req, res){
  let result = users.registerUser(req.body.username, req.body.password);

  if(result.isSuccess){
    res.cookie('loggedInUser', result.user.username)
    res.redirect('/');
  }
  else{
    res.cookie('errorMessage', result.errorMessage)
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

app.post('/logout', function(req, res){
  res.clearCookie('loggedInUser');
  res.cookie('errorMessage', 'You have logged out.')
  res.redirect('/')
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
  let content = html.render('home.html', data)
  res.send(content)
})

let images = [];

app.get('/upload', function(req, res){
  if(!req.cookies.loggedInUser){
    res.cookie('errorMessage', 'Please login first')
    res.redirect('/')
    return
  }

  let data = {
    currentUser : req.cookies.loggedInUser,
    uploads: images,
  }
  let content = html.render('upload.html', data)
  res.send(content)
});

app.post('/upload', upload.single('img'), function(req, res){
  let newUpload = {
    path: req.file.path,
    filename: req.file.originalname,
    caption: req.body.caption
  };
  images.push(newUpload);

  // uploads.createNewUpload(
  //   req.cookies.loggedInUser,
  //   req.file.path,
  //   req.file.originalname,
  //   req.body.caption
  // )

  res.redirect('/profile');
})

app.get('/profile', function(req, res){
  if(!req.cookies.loggedInUser){
    res.cookie('errorMessage', 'Please login first')
    res.redirect('/')
    return
  }

  let data = {
    currentUser : req.cookies.loggedInUser,
    uploads: images
  }

  // let data = {
  //   currentUser : req.cookies.loggedInUser,
  //   uploads: uploads.getUploadedFiles(req.cookies.loggedInUser)
  // }
  let content = html.render('profile.html', data)
  res.send(content)
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
