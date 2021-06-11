import { Request, Response } from "express";
import { omit } from "lodash";
import { adminRegisterUser } from "./admin.service";
import log from "../../../logger";

export async function adminCreateUserHandler(req: Request, res: Response) {
  try {
    const user = await adminRegisterUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
