import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const defaultOpts: TypeOrmModuleOptions = {
  name: "default",
  type: "mysql",
  host: "114.132.171.237",
  port: 3306,
  username: "order_core_dev",
  password: "order_core_dev",
  database: "order_core_dev",
  // "cache": true,
  cache: {
    duration: 30000, // 30 seconds
  },
  synchronize: false,
  autoLoadEntities: true,
  // entities: [UsersEntity],
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
export const orderOpts: TypeOrmModuleOptions = {
  ...defaultOpts,
  name: "order_order_dev",
  username: "order_order_dev",
  password: "order_order_dev",
  database: "order_order_dev",
};

export const qqOpts: TypeOrmModuleOptions = {
  ...defaultOpts,
  name: "order_qq_dev",
  username: "order_qq_dev",
  password: "order_qq_dev",
  database: "order_qq_dev",
};
export const logOpts: TypeOrmModuleOptions = {
  ...defaultOpts,
  name: "order_log_dev",
  username: "order_log_dev",
  password: "order_log_dev",
  database: "order_log_dev",
};
