// function createUserSession(req, user, action) {
//   req.session.uid = user._id.toString();
//   req.session.isAdmin = user.isAdmin;
//   req.session.save(action);
// }


// For the API
const jwtUtil = require('./jwt');

function createUserToken(user) {
  return jwtUtil.generateToken(user);
}

function logoutUser() {
  // JWTs are stateless.
  // The client is responsible for deleting the token.
  return true;
}

module.exports = {
  createUserToken,
  logoutUser
};

// function destroyUserAuthSession(req) {
//   req.session.uid = null;
// }

// module.exports = {
//   createUserSession: createUserSession,
//   destroyUserAuthSession: destroyUserAuthSession
// };