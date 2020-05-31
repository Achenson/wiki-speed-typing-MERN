const jwt = require('jsonwebtoken');

module.exports = ({context}, next) => {
  // const authHeader = context.req.get('Authorization');
   const authHeader = context.req.headers["authorisation"];

  console.log("authHeader");
  console.log(authHeader);
  

  // checking it there is in authorisation field in the incoming request
  if (!authHeader) {
    // request will travel through API, but with attached info that the user is not authorised
    context.req.isAuth = false;
    // exiting function but the request continues
    return next();
  }
                                            // signalling which type of authentication we are using
  const token = authHeader.split(' ')[1]; // [[Authorization]]: Bearer faksldfasdf[tokenvalue]
  if (!token || token === '') {
    context.req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    context.req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    context.req.isAuth = false;
    return next();
  }
 context.req.isAuth = true;
  context.req.userId = decodedToken.userId;
  next();
};