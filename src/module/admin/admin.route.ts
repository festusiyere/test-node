import express from "express";
import * as adminSchema  from  "../auth/auth.schema";
import * as  adminController from "./admin.controller";
import { validateRequest} from "../../middleware";
const router = express.Router();

/**
 * @create staff  -Register Users
 */
//Register
router.post("/", validateRequest(adminSchema.register), adminController.create);
/**
 * @update -get users
 */
 router.get("/",  adminController.getAllUser);
/**
 * @update -get a users
 */
 router.get("/:userId",  adminController.getUser);
/**
 * @update -update users
 */
 router.patch("/:userId",  adminController.update);
/**
 * @update -delete users
 */
 router.delete("/:userId", adminController.userDelete);

export default router