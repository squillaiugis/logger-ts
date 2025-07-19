/**
 * Enum representing log levels.
 * @enum
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Interface representing log entry information.
 * @interface
 */
export interface LogEntry {
  level: LogLevel;
  timestamp: Date;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}

/**
 * Interface representing Logger configuration information.
 * @interface
 */
export interface LoggerConfig {
  level: LogLevel;
  format?: LogFormatter;
  transport?: LogTransport;
  context?: Record<string, unknown>;
}

/**
 * Interface for log formatters.
 * @interface
 */
export interface LogFormatter {
  /**
   * Formats a log entry.
   * @param entry Log entry
   * @returns Formatted string
   */
  format(entry: LogEntry): string;
}

/**
 * Interface for log transports.
 * @interface
 */
export interface LogTransport {
  /**
   * Outputs a log message.
   * @param formattedMessage Formatted log message
   * @param level Log level
   */
  log(formattedMessage: string, level: LogLevel): void;
}
