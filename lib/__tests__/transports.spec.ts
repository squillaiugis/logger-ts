import { describe, expect, it, vi } from 'vitest';
import { ConsoleTransport } from '../transports';
import { LogLevel } from '../types';

describe('ConsoleTransport', () => {
  describe('constructor', () => {
    describe('normal cases', () => {
      it('should construct with console object', () => {
        expect(new ConsoleTransport(console)).toBeInstanceOf(ConsoleTransport);
      });
      it('should construct without args', () => {
        expect(new ConsoleTransport(console)).toBeInstanceOf(ConsoleTransport);
      });
    });
    describe('error cases', () => {
      it('should throw error when try to construct with invalid object', () => {
        // @ts-expect-error
        expect(() => new ConsoleTransport({})).toThrowError(
          'Tried to construct ConsoleTransport instance with invalid console object.'
        );
      });
    });
  });

  describe('log', () => {
    describe('normal cases', () => {
      const mockConsole: Pick<Console, 'debug' | 'info' | 'warn' | 'error'> = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      };

      it('should call debug log', () => {
        const transport = new ConsoleTransport(mockConsole);
        transport.log('debug log', LogLevel.DEBUG);
        expect(mockConsole.debug).toHaveBeenCalledWith('debug log');
      });

      it('should call info log', () => {
        const transport = new ConsoleTransport(mockConsole);
        transport.log('info log', LogLevel.INFO);
        expect(mockConsole.info).toHaveBeenCalledWith('info log');
      });

      it('should call warn log', () => {
        const transport = new ConsoleTransport(mockConsole);
        transport.log('warn log', LogLevel.WARN);
        expect(mockConsole.warn).toHaveBeenCalledWith('warn log');
      });

      it('should call error log', () => {
        const transport = new ConsoleTransport(mockConsole);
        transport.log('error log', LogLevel.ERROR);
        expect(mockConsole.error).toHaveBeenCalledWith('error log');
      });
    });
  });
});
