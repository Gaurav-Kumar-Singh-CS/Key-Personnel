const { authJwt } = require("../middlewares");
const routes = require('../../routes1/route')
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.all("/guestmanagement/*",[authJwt.verifyToken], routes);
  app.all("/reservationsystem/*",[authJwt.verifyToken], routes);
  app.all("/roommanagement/*",[authJwt.verifyToken, authJwt.isModerator], routes);
  app.all("/staffmanagement/*",[authJwt.verifyToken, authJwt.isAdmin], routes);
};