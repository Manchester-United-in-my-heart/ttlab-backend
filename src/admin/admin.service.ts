import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private readonly admin = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      id: 2,
      username: 'admin2',
      password: 'admin2',
    },
  ];
  async findOne(username: string): Promise<any | undefined> {
    return this.admin.find((user) => user.username === username);
  }
}
