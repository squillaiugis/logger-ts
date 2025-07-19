import { DefaultFormatter } from './formatters';
import { Logger } from './logger';
import { ConsoleTransport } from './transports';
import { LogLevel, LoggerConfig } from './types';

/**
 * Factory class to generate Logger instances.
 * Manages default settings and creates Logger objects.
 */
export class LoggerFactory {
  /**
   * Default Logger configuration.
   */
  private static defaultConfig: LoggerConfig = {
    level: LogLevel.INFO,
    format: new DefaultFormatter(),
    transport: new ConsoleTransport(),
  };

  /**
   * Creates a Logger instance.
   * @param config Optional Logger settings (partial LoggerConfig)
   * @returns Logger instance
   */
  static createLogger(config?: Partial<LoggerConfig>): Logger {
    return new Logger({ ...this.defaultConfig, ...config });
  }
}
