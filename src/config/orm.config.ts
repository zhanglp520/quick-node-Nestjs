import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const defaultOpts: TypeOrmModuleOptions = {
  name: "default",
  type: "mysql",
  host: "43.139.141.111",
  port: 3306,
  username: "iot_core_dev",
  password: "iot_core_dev",
  database: "iot_core_dev",
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
  name: "iot_log_dev",
  username: "iot_log_dev",
  password: "iot_log_dev",
  database: "iot_log_dev",
};
export const iotOpts: TypeOrmModuleOptions = {
  ...defaultOpts,
  name: "iot_device_dev",
  username: "iot_device_dev",
  password: "iot_device_dev",
  database: "iot_device_dev",
};
