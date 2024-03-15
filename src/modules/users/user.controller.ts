import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserReq } from './dto/create-user-req.dto';
import { UserService } from './user.service';
import type { Response } from 'express';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getHello(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/create')
  async create(@Body() createUserReq: CreateUserReq) {
    return this.userService.create(createUserReq);
  }

  @Get(':id/projects')
  async getProjects(@Param('id') userId: number) {
    return this.userService.getProjectsByUserId(userId);
  }

  @Get(':id/projects/exportcsv')
  async exportProjectsCSV(
    @Res({ passthrough: true }) res: Response,
    @Param('id') userId: number,
  ): Promise<StreamableFile> {
    return await this.userService.exportProjectCSV(res, userId);
  }
}
