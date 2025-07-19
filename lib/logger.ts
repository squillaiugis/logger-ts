import { DefaultFormatter } from './formatters';
import { ConsoleTransport } from './transports';
import { LogEntry, LogLevel, LoggerConfig } from './types';

/**
 * Logger class for outputting logs.
 * Manages log levels, format, transport, and context.
 */
export class Logger {
  /**
   * Logger configuration information.
   */
  private config: Required<LoggerConfig>;

  /**
   * Creates a Logger instance.
   * @param config Logger configuration
   */
  constructor(config: LoggerConfig) {
    if (!config || !('level' in config)) {
      throw new TypeError('Tried to construct Logger instance without log level parameter.');
    }
    this.config = {
      level: config.level,
      format: config.format || new DefaultFormatter(),
      transport: config.transport || new ConsoleTransport(),
      context: config.context || {},
    };
  }

  /**
   * Outputs a log (internal use).
   * @param level Log level
   * @param message Log message
   * @param context Additional context
   * @param error Error information
   */
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): void {
    if (!this.isLevelEnabled(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      timestamp: new Date(),
      message,
      context: { ...this.config.context, ...context },
      error,
    };

    const formattedMessage = this.config.format.format(entry);
    this.config.transport.log(formattedMessage, level);
  }

  /**
   * Outputs a DEBUG level log.
   * @param message Log message
   * @param context Additional context
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Outputs an INFO level log.
   * @param message Log message
   * @param context Additional context
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Outputs a WARN level log.
   * @param message Log message
   * @param context Additional context
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Outputs an ERROR level log.
   * @param message Log message
   * @param context Additional context
   * @param error Error information
   */
  error(message: string, context?: Record<string, unknown>, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Determines whether the specified log level is enabled.
   * @param level Log level to check
   * @returns true if enabled
   */
  private isLevelEnabled(level: LogLevel): boolean {
    return level >= this.config.level;
  }
}
