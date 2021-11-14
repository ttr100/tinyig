const fs = require('fs');

let users = [];

let FILE_NAME = 'users.data';

function storeToFile(users){
  let objectToStore = {
    users: users
  }

  let stringToStore = JSON.stringify(objectToStore);
  fs.writeFileSync(FILE_NAME, stringToStore);
}

function readFromFile(){
  if(fs.existsSync(FILE_NAME)){
    let fileContent = fs.readFileSync(FILE_NAME, 'utf-8');
    let parsedData = JSON.parse(fileContent);
    users = parsedData.users;
  }
}

// return user object if successful,
// return null if fail
function registerUser(username, password){
  let user = {
    username: username,
    password: password
  }
  users.push(user)

  storeToFile(users);
  return user
}

// return user object if successful,
// return null if fail
function authenticateUser(username, password){
  for(let i=0; i<users.length;i++){
    if(username === users[i].username && password === users[i].password){
      return users[i];
    }
  }

  return null;
}

readFromFile();

module.exports = {
  registerUser: registerUser,
  authenticateUser: authenticateUser,
}
