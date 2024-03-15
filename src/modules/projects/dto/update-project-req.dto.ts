import { CreateProjectReq } from './create-project-req.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateProjectReq extends PartialType(CreateProjectReq) {}
