export default {
  appenders: {
    console: {
      type: 'console',
      category: 'console',
    },
    everything: {
      type: 'file',
      filename: 'log/log.log',
    },
    info: {
      type: 'file',
      category: 'info',
      filename: 'log/info/info',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      //最大文件大小，按字节计算 1024 * 1024 * 8 = 8M
      //integer (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
      maxLogSize: 1024 * 1024 * 8,
      backups: 5,
      keepFileExt: true,
      compress: false,
    },
    error: {
      type: 'file',
      category: 'error',
      filename: 'log/error/error',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      //最大文件大小，按字节计算 1024 * 1024 * 8 = 8M
      //integer (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
      maxLogSize: 1024 * 1024 * 8,
      backups: 10,
      keepFileExt: true,
      compress: false,
    },
  },
  categories: {
    info: {
      appenders: ['info', 'console'],
      level: 'info',
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error',
    },
    default: {
      appenders: ['everything', 'console'],
      level: 'debug',
    },
  },
};
