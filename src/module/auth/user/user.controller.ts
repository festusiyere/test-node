import { Request, Response } from "express";
import { omit } from "lodash";
import { registerUser } from "./user.service";
import log from "../../../logger";

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
