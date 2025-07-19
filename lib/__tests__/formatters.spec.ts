import { describe, expect, it, vi } from 'vitest';
import { DefaultFormatter, JSONFormatter } from '../formatters';
import { LogLevel } from '../types';

describe('DefaultFormatter', () => {
  const formatter = new DefaultFormatter();
  const mockTimeStamp = '2025-07-18T13:37:09.218Z';
  const mockText = 'Text Message';
  const mockContext = {
    context: 'Text Context',
  };
  const mockError = new Error('Test Error');
  const dateMock = new Date();
  dateMock.toISOString = vi.fn().mockReturnValue(mockTimeStamp);

  describe('format', () => {
    describe('normal cases', () => {
      it('should return formatted message with only required parameters', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
        });

        expect(msg).toBe(`[DEBUG] ${mockTimeStamp} ${mockText}`);
      });

      it('should return formatted message with context', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
          context: mockContext,
        });

        expect(msg).toBe(
          `[DEBUG] ${mockTimeStamp} ${mockText}\n${JSON.stringify(mockContext, null, 2)}`
        );
      });

      it('should return formatted message with error', () => {
        const msg = formatter.format({
          level: LogLevel.INFO,
          message: mockText,
          timestamp: dateMock,
          error: mockError,
        });

        expect(msg).toBe(
          `[INFO] ${mockTimeStamp} ${mockText}\n${mockError.name}: ${mockError.message}`
        );
      });

      it('should return formatted detailed message with debug level and error', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
          error: mockError,
        });

        expect(msg).toBe(`[DEBUG] ${mockTimeStamp} ${mockText}\n${mockError.stack}`);
      });
    });
  });
});

describe('JSONFormatter', () => {
  describe('constructor', () => {
    describe('normal cases', () => {
      it('should construct with boolean value', () => {
        expect(new JSONFormatter(true)).toBeInstanceOf(JSONFormatter);
      });
      it('should construct without args', () => {
        expect(new JSONFormatter()).toBeInstanceOf(JSONFormatter);
      });
    });
  });

  const formatter = new JSONFormatter();
  const mockTimeStamp = '2025-07-18T13:37:09.218Z';
  const mockText = 'Text Message';
  const mockContext = {
    context: 'Text Context',
  };
  const mockError = new Error('Test Error');
  const dateMock = new Date();
  dateMock.toISOString = vi.fn().mockReturnValue(mockTimeStamp);

  describe('format', () => {
    describe('normal cases', () => {
      it('should return formatted message with only required parameters', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
        });

        expect(msg).toBe(
          `{"level":"DEBUG","timestamp":"${mockTimeStamp}","message":"${mockText}"}`
        );
      });

      it('should return formatted message with context', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
          context: mockContext,
        });

        expect(msg).toBe(
          `{"level":"DEBUG","timestamp":"${mockTimeStamp}","message":"${mockText}","context":${JSON.stringify(mockContext)}}`
        );
      });
      it('should return formatted detailed message with debug level and error', () => {
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
          error: mockError,
        });

        expect(msg).toBe(
          `{"level":"DEBUG","timestamp":"${mockTimeStamp}","message":"${mockText}","error":${JSON.stringify(
            {
              message: mockError.message,
              stack: mockError.stack,
              name: mockError.name,
            }
          )}}`
        );
      });

      it('should return formatted message with error', () => {
        const msg = formatter.format({
          level: LogLevel.INFO,
          message: mockText,
          timestamp: dateMock,
          error: mockError,
        });

        expect(msg).toBe(
          `{"level":"INFO","timestamp":"${mockTimeStamp}","message":"${mockText}","error":${JSON.stringify(
            {
              message: mockError.message,
              name: mockError.name,
            }
          )}}`
        );
      });

      it('should return pretty formatted message', () => {
        const formatter = new JSONFormatter(true);
        const msg = formatter.format({
          level: LogLevel.DEBUG,
          message: mockText,
          timestamp: dateMock,
        });

        expect(msg).toBe(
          `{
  "level": "DEBUG",
  "timestamp": "${mockTimeStamp}",
  "message": "${mockText}"
}`
        );
      });
    });
  });
});
