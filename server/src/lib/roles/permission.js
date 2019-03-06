import logger from '../logger';

const permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) next();
    else {
      logger.error(`Unauthorized access attempt by user: ${req.user.email} to route ${req.path}!`);
      res.status(403).json({ status: 403, message: 'You are not authorized to access this resource' });
    }
  };
};

export default permit;
