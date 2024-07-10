import express from "express";
import UserController from "./user.controller.js";
import { auth } from "../../middleware/jwtAuth.middleware.js";



const userRoutes = express.Router();
const userController = new UserController();

//======== routes for user signup =======//
userRoutes.post("/signup", (req,res,next)=>{
    userController.signup(req,res,next);
})

//======== routes for user signin =======//
userRoutes.post("/signin", (req,res,next)=>{
    userController.signin(req,res,next);
});


//======== update user profile ==========//


//======== routes for user logout =======//
userRoutes.get("/logout",auth, (req,res,next)=>{
    userController.logout(req,res,next);
})




export default userRoutes;