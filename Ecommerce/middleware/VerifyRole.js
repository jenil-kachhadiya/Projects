const verifyRole = (...arg) => {
  try {
    return (req, res, next) => {
        if (arg.includes(req.user.role)) next()
            else return res.json({ message: 'Invalid Role'})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = verifyRole;