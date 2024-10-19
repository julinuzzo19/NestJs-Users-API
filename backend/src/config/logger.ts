import { createLogger, format, transports } from 'winston';
import {
  ConsoleTransportOptions,
  FileTransportOptions,
} from 'winston/lib/winston/transports';
import { NODE_ENV } from './envs';

// custom log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase()}] - ${message}`;
});

const options: {
  console: ConsoleTransportOptions;
  file: FileTransportOptions;
} = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

// for development environment
const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [new transports.Console(options.console)],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'combine.log',
      level: 'info',
    }),
  ],
};

// export log instance based on the current environment
const instanceLogger = NODE_ENV === 'production' ? prodLogger : devLogger;

export const logger = createLogger(instanceLogger);
