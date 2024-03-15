import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { Project } from './entities/project.entity';
import { ProjectModule } from './modules/projects/project.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Project],
    }),
    RouterModule.register([
      {
        path: '/api',
        children: [
          {
            path: '/app',
            children: [
              {
                path: '/projects',
                module: ProjectModule,
              },
            ],
          },
          {
            path: '/users',
            module: UserModule,
          },
        ],
      },
    ]),
    UserModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
