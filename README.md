# logger-ts

[![npm version](https://badge.fury.io/js/@squilla%2Flogger-ts.svg)](https://www.npmjs.com/package/@squilla/logger-ts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A flexible and extensible logger library written in TypeScript. Supports configurable log levels, formatters, and transports.

## 🚀 Features

- ✅ **Configurable log levels**: DEBUG, INFO, WARN, ERROR
- ✅ **Flexible formatters**: Default formatter and JSON formatter
- ✅ **Multiple transports**: Supports console output
- ✅ **Context information**: Log output with additional metadata
- ✅ **Error handling**: Detailed information for error objects
- ✅ **TypeScript support**: Full type safety

## 📦 Installation

```bash
npm install @squilla/logger-ts
```

or

```bash
yarn add @squilla/logger-ts
```

## 🔧 Basic Usage

### Simple Example

```typescript
import { LoggerFactory } from '@squilla/logger-ts';

// Create a logger with default settings
const logger = LoggerFactory.createLogger();

// Output logs
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

### Custom Settings

```typescript
import { LoggerFactory, LogLevel, JSONFormatter } from '@squilla/logger-ts';

// Create a logger with custom settings
const logger = LoggerFactory.createLogger({
  level: LogLevel.DEBUG,
  format: new JSONFormatter(true), // pretty-print JSON
});

logger.info('Log message with custom settings');
```

## ⚙️ Configuration Options

### Log Levels

| Level   | Value | Description             |
| ------- | ----- | ----------------------- |
| `DEBUG` | 0     | Debug information (dev) |
| `INFO`  | 1     | General information     |
| `WARN`  | 2     | Warning messages        |
| `ERROR` | 3     | Error messages          |

> [!NOTE]
> When you set a log level, only logs at that level or higher will be output. For example, if set to `LogLevel.WARN`, only WARN and ERROR logs will be output.

### Formatters

#### DefaultFormatter

Outputs logs in a human-readable format.

```typescript
import { LoggerFactory, DefaultFormatter } from '@squilla/logger-ts';

const logger = LoggerFactory.createLogger({
  format: new DefaultFormatter()
});
```

**Example output:**
```
[INFO] 2024-01-15T10:30:45.123Z Application started
```

#### JSONFormatter

Outputs logs in JSON format.

```typescript
import { LoggerFactory, JSONFormatter } from '@squilla/logger-ts';

// Compact JSON
const logger1 = LoggerFactory.createLogger({
  format: new JSONFormatter(false)
});

// Pretty-print JSON
const logger2 = LoggerFactory.createLogger({
  format: new JSONFormatter(true)
});
```

**Example output:**
```json
{
  "level": "INFO",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "message": "Application started"
}
```

### Transports

#### ConsoleTransport (default)

Outputs logs to standard output.

```typescript
import { LoggerFactory, ConsoleTransport } from '@squilla/logger-ts';

const logger = LoggerFactory.createLogger({
  transport: new ConsoleTransport()
});
```

## 🎯 Advanced Usage

### Context Information

You can add context information to logs.

```typescript
const logger = LoggerFactory.createLogger();

// Add context to individual logs
logger.info('User logged in', { 
  userId: 12345, 
  ip: '192.168.1.1' 
});

// Set default context when creating the logger
const contextLogger = LoggerFactory.createLogger({
  context: { 
    service: 'user-service',
    version: '1.0.0' 
  }
});
```

### Error Logs

You can output logs that include error objects.

```typescript
const logger = LoggerFactory.createLogger();

try {
  // Some process
  throw new Error('Database connection error');
} catch (error) {
  logger.error('An error occurred during processing', { 
    operation: 'database-connection' 
  }, error);
}
```

> [!TIP]
> For DEBUG level, the full stack trace is output. For other levels, only the error name and message are output.

### Using the Logger Class Directly

```typescript
import { Logger, LogLevel, DefaultFormatter, ConsoleTransport } from '@squilla/logger-ts';

const logger = new Logger({
  level: LogLevel.INFO,
  format: new DefaultFormatter(),
  transport: new ConsoleTransport()
});

logger.info('Logger created directly');
```

## 🛠️ Customization

### Creating a Custom Formatter

You can also create your own formatter.

```typescript
import { LogFormatter, LogEntry, LogLevel } from '@squilla/logger-ts';

class CustomFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const level = LogLevel[entry.level];
    const time = entry.timestamp.toLocaleString('ja-JP');
    return `${time} [${level}] ${entry.message}`;
  }
}

const logger = LoggerFactory.createLogger({
  format: new CustomFormatter()
});
```

### Creating a Custom Transport

You can also create your own transport.

```typescript
import { LogTransport, LogLevel } from '@squilla/logger-ts';

class FileTransport implements LogTransport {
  constructor(private filename: string) {}

  log(formattedMessage: string, level: LogLevel): void {
    // Write to file
    console.log(`Writing to file ${this.filename}: ${formattedMessage}`);
  }
}

const logger = LoggerFactory.createLogger({
  transport: new FileTransport('app.log')
});
```

## 📚 API Reference

### LoggerFactory

#### `createLogger(config?: Partial<LoggerConfig>): Logger`

Creates a logger instance.

**Parameters:**
- `config` (optional): Logger settings (partial settings allowed)

### Logger

#### `debug(message: string, context?: Record<string, unknown>): void`

Outputs a DEBUG level log.

#### `info(message: string, context?: Record<string, unknown>): void`

Outputs an INFO level log.

#### `warn(message: string, context?: Record<string, unknown>): void`

Outputs a WARN level log.

#### `error(message: string, context?: Record<string, unknown>, error?: Error): void`

Outputs an ERROR level log.

### Configuration Interfaces

#### `LoggerConfig`

```typescript
interface LoggerConfig {
  level: LogLevel;
  format?: LogFormatter;
  transport?: LogTransport;
  context?: Record<string, unknown>;
}
```

#### `LogEntry`

```typescript
interface LogEntry {
  level: LogLevel;
  timestamp: Date;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}
```

## 💡 Best Practices

> [!IMPORTANT]
> Following these best practices enables effective log management.

1. **Use appropriate log levels**
   - `DEBUG`: Detailed information for development
   - `INFO`: General information and application state
   - `WARN`: Matters to be aware of (not errors but noteworthy)
   - `ERROR`: Problems and errors

2. **Utilize context information**
   - Include relevant information for traceability
   - Record user IDs, request IDs, operation names, etc.

3. **Settings for production**
   - Set an appropriate log level for production (usually INFO or higher)
   - Be careful not to include sensitive information in logs

4. **Record error information**
   - Appropriately record error objects in try-catch blocks
   - Record error details along with context

> [!WARNING]
> In production, be very careful not to include sensitive information (passwords, API keys, personal information, etc.) in logs.

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).