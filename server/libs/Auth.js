import globalConstants from '../globalConstants';
import jwToken from './jwToken';


export async function checkLogin(req, res, next) {
  let token;
  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      let scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return next();
    }
  } else if (req.query.token) {
    token = req.query.token;
  } else {
    return next();
  }

  try {
    // console.log('verify:', token);
    let data = await jwToken.verify(token); // This is the decrypted token or the payload you provided
    if (data) req.user = data;
    // console.log('req.user:', req.user);
    return next();
  } catch (err) {
    return next();
  }
}

export function isAuth(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).json({
    success: false,
    err: 'You are not logged in.'
  });
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === globalConstants.userRoles.ADMIN) {
    return next();
  }
  return res.status(403).json({
    success: false,
    err: 'Permission denied.'
  });
}
