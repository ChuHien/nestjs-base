import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { CreateProjectReq } from './dto/create-project-req.dto';
import { UpdateProjectReq } from './dto/update-project-req.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectReq: CreateProjectReq): Promise<Project> {
    let project = this.projectRepository.create(createProjectReq);
    project = await this.projectRepository.save(createProjectReq);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(projectId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async update(
    projectId: number,
    updateProjectReq: UpdateProjectReq,
  ): Promise<Project> {
    await this.projectRepository.update(projectId, updateProjectReq);
    const updateProject = await this.getProjectById(projectId);
    return updateProject;
  }

  async delete(projectId: number) {
    const project = await this.getProjectById(projectId);
    return await this.projectRepository.remove(project);
  }
}
