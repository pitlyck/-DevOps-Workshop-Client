import { checkStatus } from '../../../src/shared/utils/checkStatus';

describe('Correctly decides whether the response from the server is successful', () => {

  it('returns response when response property ok is true', () => {
    const successfulResponse = { ok: true } as Response;

    const actual = checkStatus(successfulResponse);

    expect(actual).toBe(successfulResponse);
  });

  it('throws an error when response property ok is false', () => {
    const failedResponse = { ok: false } as Response;

    expect(() => checkStatus(failedResponse)).toThrowError();
  });
});

