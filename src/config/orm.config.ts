import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const defaultOpts: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: '43.139.141.111',
  port: 3306,
  username: 'quick_core_v2',
  password: 'quick_core_v2',
  database: 'quick_core_v2',
  // "cache": true,
  cache: {
    duration: 30000, // 30 seconds
  },
  synchronize: false,
  autoLoadEntities: true,
  // entities: [UsersEntity],
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
export const logOpts: TypeOrmModuleOptions = {
  ...defaultOpts,
  name: 'quick_log_v2',
  username: 'quick_log_v2',
  password: 'quick_log_v2',
  database: 'quick_log_v2',
};
