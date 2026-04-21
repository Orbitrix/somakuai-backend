import { Request, Response } from "express";
import { getTime } from "../utils/helpers.js";

export const logger = (req: Request, res: Response, next: any) => {
  const time = getTime()
  console.log(`${time} -- ${req.method} ${req.path} -- (${req.ip})`);

  next();
}