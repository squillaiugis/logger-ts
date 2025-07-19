import { describe, expect, it, vi } from 'vitest';
import { DefaultFormatter } from '../formatters';
import { Logger } from '../logger';
import { ConsoleTransport } from '../transports';
import { LogLevel } from '../types';

describe('Logger', () => {
  describe('constructor', () => {
    describe('normal cases', () => {
      it('should construct with console object', () => {
        expect(new Logger({ level: LogLevel.DEBUG })).toBeInstanceOf(Logger);
      });
    });
    describe('error cases', () => {
      it('should throw error when try to construct with invalid object', () => {
        // @ts-expect-error
        expect(() => new Logger()).toThrowError(
          'Tried to construct Logger instance without log level parameter.'
        );
      });
    });
  });

  describe('log', () => {
    const mockArgs = '[DEBUG] 2025-07-18T14:48:20.822Z debug log';
    const mockConsole: Pick<Console, 'debug' | 'info' | 'warn' | 'error'> = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const mockTransport = new ConsoleTransport(mockConsole);
    // const mockFormatter = new DefaultFormatter();
    const mockFormatter = vi.mockObject(new DefaultFormatter());
    mockFormatter.format.mockReturnValue(mockArgs);

    const logger = new Logger({
      level: LogLevel.DEBUG,
      transport: mockTransport,
      format: mockFormatter,
    });

    it('should not call logger function when log level is unabled', () => {
      const logger = new Logger({
        level: LogLevel.ERROR,
        transport: mockTransport,
        format: mockFormatter,
      });
      logger.debug('debug log');
      expect(mockConsole.debug).not.toHaveBeenCalled();
    });

    describe('debug', () => {
      describe('normal cases', () => {
        it('should call debug log', () => {
          logger.debug('debug log');
          expect(mockConsole.debug).toHaveBeenCalledWith(mockArgs);
        });
      });
    });
    describe('info', () => {
      describe('normal cases', () => {
        it('should call info log', () => {
          logger.info('info log');
          expect(mockConsole.info).toHaveBeenCalledWith(mockArgs);
        });
      });
    });
    describe('warn', () => {
      describe('normal cases', () => {
        it('should call warn log', () => {
          logger.warn('warn log');
          expect(mockConsole.warn).toHaveBeenCalledWith(mockArgs);
        });
      });
    });
    describe('error', () => {
      describe('normal cases', () => {
        it('should call error log', () => {
          logger.error('error log');
          expect(mockConsole.error).toHaveBeenCalledWith(mockArgs);
        });
      });
    });
  });
});
