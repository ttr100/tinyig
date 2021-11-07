
let users = [];


// return user object if successful,
// return null if fail
function registerUser(username, password){
  let user = {
    username: username,
    password: password
  }
  users.push(user)

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


module.exports = {
  registerUser: registerUser,
  authenticateUser: authenticateUser,
}
