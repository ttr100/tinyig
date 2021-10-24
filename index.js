const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(cookieParser());

const port = 3000;

app.get('/', function(req, res){
  res.send('Hello');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})