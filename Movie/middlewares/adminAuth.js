module.exports = (req, res, next) => {
  if (!req.cookies.adminId) {
    return res.redirect('/admin/login');
  }
  next();
};
