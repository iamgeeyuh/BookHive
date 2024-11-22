const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401); 
  }
  next();
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRole };