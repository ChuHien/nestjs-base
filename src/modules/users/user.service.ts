import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { Parser } from 'json2csv';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserReq } from './dto/create-user-req.dto';
import type { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserReq: CreateUserReq): Promise<User> {
    let user = this.userRepository.create(createUserReq);
    user = await this.userRepository.save(createUserReq);
    return user;
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['projects'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user.projects;
  }

  async exportProjectCSV(
    res: Response,
    userId: number,
  ): Promise<StreamableFile> {
    const projects = await this.getProjectsByUserId(userId);
    const fields = [
      {
        label: 'No',
        value: 'id',
      },
      'name',
      'category',
      {
        label: 'projected_spend',
        value: 'projectedSpend',
      },
      {
        label: 'projected_variance',
        value: 'projectedVariance',
      },
      {
        label: 'projected_recognised',
        value: 'revenueRecognised',
      },
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    const csvFile = parser.parse(projects);
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename = project_user_${userId}.csv`,
    });
    return new StreamableFile(Buffer.from(csvFile));
  }
}
