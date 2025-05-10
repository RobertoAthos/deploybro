import { AppDataSource } from "db/dataSource";
import { User } from "db/entities/User";
import { UserSchemaType } from "db/schemas/User";

export class userRepository {
  async createUser(data: UserSchemaType) {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(data);
    await userRepository.save(user);
    return user;
  }
}
