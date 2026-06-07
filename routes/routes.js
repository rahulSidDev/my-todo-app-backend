const express = require("express");
const allRoutes = express.Router();

const createTodo = require("../controllers/todos/create");
const deleteTodo = require("../controllers/todos/delete");
const getTodo = require("../controllers/todos/get");
const getAllTodos = require("../controllers/todos/getAll");
const updateTodo = require("../controllers/todos/update");

const signup = require("../controllers/user/signup");
const login = require("../controllers/user/login");
const otpCreation = require("../controllers/user/otpCreation");
const profile = require("../controllers/user/profile");
const resetPassword = require("../controllers/user/resetPass");
const forgotPassword = require("../controllers/user/forgotPass");
const forgotPassOtp = require("../controllers/user/forgotPassOtp");

const {auth} = require("../middleware/auth");

allRoutes.post("/createTodo", auth, createTodo);
allRoutes.delete("/deleteTodo/:id", auth, deleteTodo);
allRoutes.get("/getTodo/:id", auth, getTodo);
allRoutes.get("/getAllTodos", auth, getAllTodos);
allRoutes.put("/updateTodo/:id", auth, updateTodo);

allRoutes.post("/user/signup", signup);
allRoutes.post("/user/login", login);
allRoutes.post("/user/otp", otpCreation)
allRoutes.get("/user/profile", auth, profile)
allRoutes.post("/user/reset-password", auth, resetPassword)
allRoutes.post("/user/forgot-password", forgotPassword)
allRoutes.post("/user/forgot-password-reset", resetPassword)
allRoutes.post("/user/forgot-password-otp", forgotPassOtp)
allRoutes.post("/user/logout", auth, (req, res) => {

  res.clearCookie("myCookie");

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

module.exports = allRoutes;