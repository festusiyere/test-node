import express from "express";
import * as authSchema  from  "./auth.schema";
import * as  authController from "./auth.controller";
import * as adminController from "../admin/admin.controller";
import { validateRequest, auth, requiresAuth } from "../../middleware";
import * as rateLimiter from  '../../middleware/rateLimiter';
const router = express.Router();

/**
 * @registrater  -Register Users
 */
//Register
router.post("/register", validateRequest(authSchema.register), authController.register);
/**
 * @Login -login users
 */
// !note : Rate Limiter here controls login Attempt
router.post("/login", rateLimiter.login, validateRequest(authSchema.login), authController.login);
/**
 * @forgetPassword
 */
router.post("/forget-password", validateRequest(authSchema.forgetPassword), authController.forgetPassword);
/**
 * @resetPassword
 */
router.patch("/reset-password/:resetToken", validateRequest(authSchema.resetPassword), authController.resetPassword);
/***
 *  @loggedIn
 */
 router.get("/logged-in",auth,requiresAuth, authController.loggedIn);
 /**
  */
/**
 * @logout
 */
router.post("/logout",auth, requiresAuth, authController.logout);
/**
 * Special Route to seed admin and user(mainly for testing purpose)
 */
router.post("/seed-staff",auth, validateRequest(authSchema.register), adminController.create);

export default router