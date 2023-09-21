import express from 'express'
import {forgotPasswordController, loginController, registerController, testController, updateProfileController} from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router=express.Router()

// register method->post
router.post('/register',registerController);

// login method->post
router.post('/login',loginController);

// test routes
router.get('/test',requireSignIn,testController)

// protected route auth in frontend
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

// Forget password method->post
router.post('/forgot-password',forgotPasswordController)

// Update user profile
router.put('/update-profile',requireSignIn,updateProfileController);


export default router;