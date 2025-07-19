import { describe, expect, it } from 'vitest';
import { LoggerFactory } from '../factory';
import { DefaultFormatter, JSONFormatter } from '../formatters';
import { Logger } from '../logger';

describe('LoggerFactory', () => {
  describe('createLogger', () => {
    describe('normal cases', () => {
      it('should create Default Logger instance without arguments', () => {
        const logger = LoggerFactory.createLogger();
        expect(logger).toBeInstanceOf(Logger);
        // @ts-expect-error
        expect(logger.config.format).toBeInstanceOf(DefaultFormatter);
      });

      it('should create Custom Logger instance with arguments', () => {
        const logger = LoggerFactory.createLogger({
          format: new JSONFormatter(true),
        });
        expect(logger).toBeInstanceOf(Logger);
        // @ts-expect-error
        expect(logger.config.format).toBeInstanceOf(JSONFormatter);
      });
    });
  });
});
