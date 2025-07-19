import { LogEntry, LogFormatter, LogLevel } from './types';

/**
 * Default log formatter.
 * Formats log entries into human-readable strings.
 */
export class DefaultFormatter implements LogFormatter {
  /**
   * Formats a log entry.
   * @param entry Log entry
   * @returns Formatted string
   */
  format(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const level = LogLevel[entry.level];
    const context =
      entry.context && Object.keys(entry.context).length > 0
        ? `\n${JSON.stringify(entry.context, null, 2)}`
        : '';
    const error = entry.error
      ? entry.level === LogLevel.DEBUG
        ? `\n${entry.error.stack}`
        : `\n${entry.error.name}: ${entry.error.message}`
      : '';

    return `[${level}] ${timestamp} ${entry.message}${context}${error}`;
  }
}

/**
 * JSON log formatter.
 * Formats log entries as JSON strings.
 */
export class JSONFormatter implements LogFormatter {
  private pretty: boolean;
  /**
   * @param pretty Whether to output pretty-printed (indented) JSON
   */
  constructor(pretty: boolean = false) {
    this.pretty = pretty;
  }

  /**
   * Formats a log entry as a JSON string.
   * @param entry Log entry
   * @returns JSON string
   */
  format(entry: LogEntry): string {
    const logData = {
      level: LogLevel[entry.level],
      timestamp: entry.timestamp.toISOString(),
      message: entry.message,
      ...(entry.context && Object.keys(entry.context).length > 0 && { context: entry.context }),
      ...(entry.error && {
        error:
          entry.level === LogLevel.DEBUG
            ? {
                message: entry.error.message,
                stack: entry.error.stack,
                name: entry.error.name,
              }
            : {
                message: entry.error.message,
                name: entry.error.name,
              },
      }),
    };

    return JSON.stringify(logData, null, this.pretty ? 2 : 0);
  }
}
