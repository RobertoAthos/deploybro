import { UserSchema } from "db/schemas/User";
import { Request, Response } from "express";
import { userRepository } from "repositories/userRepository";

export class userController {
  private userRepository: userRepository;

  async createUser(req: Request, res: Response) {
    const data = req.body;
    const parsedData = UserSchema.safeParse(data);
    if (!parsedData.success) {
      const errors = parsedData.error.format();
      const errorsData = { success: false, errors };
      res.status(400).json(errorsData);
    }
    const user = await this.userRepository.createUser(data);
    res.status(201).json(user);
  }
}
