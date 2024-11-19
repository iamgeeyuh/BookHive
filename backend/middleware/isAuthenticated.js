const isAuthenticated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.sendStatus(401);
};

module.exports = isAuthenticated;
