import { LogLevel, LogTransport } from './types';

/**
 * Transport for outputting logs to standard output (console).
 */
export class ConsoleTransport implements LogTransport {
  /**
   * The console object to use.
   */
  private readonly console: Pick<Console, 'debug' | 'info' | 'warn' | 'error'>;

  /**
   * Creates an instance of ConsoleTransport.
   * @param console The console object to use (defaults to global console)
   */
  constructor(console: Pick<Console, 'debug' | 'info' | 'warn' | 'error'> = globalThis.console) {
    if (
      !('debug' in console) ||
      !('info' in console) ||
      !('warn' in console) ||
      !('error' in console)
    ) {
      throw new TypeError(
        'Tried to construct ConsoleTransport instance with invalid console object.'
      );
    }

    this.console = console;
  }

  /**
   * Outputs a log message.
   * @param formattedMessage Formatted log message
   * @param level Log level
   */
  log(formattedMessage: string, level: LogLevel): void {
    switch (level) {
      case LogLevel.DEBUG:
        this.console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        this.console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        this.console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
        this.console.error(formattedMessage);
        break;
    }
  }
}
