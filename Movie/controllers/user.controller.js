const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.registerUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email, isDeleted : false });
    if (user) return res.send("User Already Exist");

    let hashpassword = await bcrypt.hash(req.body.password, 10);

    const NewUser = await User.create({
        ...req.body,
        password: hashpassword,
    })
    res.status(201).json({message: "Registered successfully", data: NewUser });

}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let token = jwt.sign({ id: user._id },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {httpOnly: true });

    return res.status(200).json({message: "Logged in successfully",token });

  } catch (error) {console.error(error); 
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.getAllUser = async (req, res) => {
    try {
        let sortBy = req.query.sortBy || "createdAt";
        let order = req.query.order === "asc" ? 1 : -1;

        let users = await User.find({ isDelete: false }).sort({ [sortBy]: order });

        res.json(users);

    } catch (error) {res.status(500).json({ error: error.message });}
};


exports.updateProfile = async (req, res) => {
  try {
      const newUser = await User.findByIdAndUpdate(
        req.user._id,{
          ...req.body
        },
        { returnDocument: "after"});
    return res.status(200).json({
      message: "Profile updated successfully",data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

exports.logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isDeleted: true });

  res.json({ message: "Account deleted (soft)" });
};