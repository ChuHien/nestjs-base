import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Param,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProjectReq } from './dto/create-project-req.dto';
import { CreateProjectRes } from './dto/create-project-res.dto';
import { ProjectService } from './project.service';
import { plainToClass } from 'class-transformer';
import { Project } from 'src/entities/project.entity';
import { UpdateProjectReq } from './dto/update-project-req.dto';
import { UpdateProjectRes } from './dto/update-project-res.dto';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/create')
  async create(
    @Body() createProjectReq: CreateProjectReq,
  ): Promise<CreateProjectRes> {
    const project = await this.projectService.create(createProjectReq);
    return plainToClass(CreateProjectRes, project, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async read(@Param('id') id: number): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectReq: UpdateProjectReq,
  ): Promise<UpdateProjectRes> {
    const project: Project = await this.projectService.update(
      id,
      updateProjectReq,
    );
    return plainToClass(UpdateProjectRes, project, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.projectService.delete(id);
    return 'Delete success';
  }
}
