const store = require('./storage');

let users = new store.DataStore('users.data');

// return user object if successful,
// Server side validation
function registerUser(username, password){
  let user = {
    username: username,
    password: password
  }

  if(user.password.length < 5)
  {
    return {
      isSuccess: false,
      errorMessage: "Password has to be at least 5 chars"
    }
  }

  if(user.username.length == 0){
    return {
      isSuccess: false,
      errorMessage: "Username is required"
    }
  }

  let allUsers = users.getAll();
  for(let i = 0; i < allUsers.length; i++)
  {
    if(user.username == allUsers[i].username)
    {
      return {
        isSuccess: false,
        errorMessage: "Username has been taken"
      }
    }
  }

  users.push(user)
  return {
    isSuccess: true,
    user: user
  }
}

// return user object if successful,
// return null if fail
function authenticateUser(username, password){
  let allUsers = users.getAll();
  for(let i=0; i<allUsers.length;i++){
    if(username === allUsers[i].username && password === allUsers[i].password){
      return allUsers[i];
    }
  }

  return null;
}

module.exports = {
  registerUser: registerUser,
  authenticateUser: authenticateUser,
}
