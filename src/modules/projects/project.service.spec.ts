import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Project } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateProjectReq } from './dto/update-project-req.dto';

describe('UserService', () => {
  let service: ProjectService;

  const projectRespositoryFake = {
    create: jest.fn().mockImplementation((project) => project),
    save: jest.fn().mockImplementation((project) => Promise.resolve(project)),

    find: jest.fn().mockImplementation(() => Promise.resolve([new Project()])),

    findOne: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve(new Project())),

    update: jest
      .fn()
      .mockImplementation((id: number, projectReq: UpdateProjectReq) =>
        Promise.resolve(new Project()),
      ),

    remove: jest
      .fn()
      .mockImplementation((project: Project) =>
        project.id == 1
          ? Promise.resolve({ affected: 1 })
          : Promise.resolve({ affected: 0 }),
      ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepository,
          useValue: projectRespositoryFake,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test create method', async () => {
    const project = new Project();
    expect((await service.create(project)) instanceof Project).toBeTruthy();
  });

  it('test getProjectById method and return throw exception', async () => {
    try {
      await service.getProjectById(0);
    } catch (e) {
      expect(e).toEqual(new NotFoundException());
    }
  });

  it('test getProjectById method and return a instance of project', async () => {
    expect((await service.getProjectById(1)) instanceof Project).toBeTruthy();
  });

  it('test update mehtod and return a instance of project', async () => {
    expect(
      (await service.update(1, new Project())) instanceof Project,
    ).toBeTruthy();
  });
});
