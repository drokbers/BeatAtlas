/**
 * Required External Modules and Interfaces
 */

import { Router, Request, Response } from "express";

import userService from "./users.service";

/**
 * Router Definition
 */

const usersRouter: Router = Router();

//register

usersRouter.post("/auth/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.register(username, password);
    res.json({ message: "Register successful", user });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

//login

usersRouter.post("/auth/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.login(username, password);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

//logout

// usersRouter.post("/auth/logout", async (req: Request, res: Response) => {
//   try {
//     res.json({ message: "logout successful" });
//   } catch (error) {
//     res.status(401).json({ error: (error as Error).message });
//   }
// });

export default usersRouter;
