import * as dbUtil from './db.util';

describe('DB Util', () => {
  describe('checkResponse', () => {
    it('should return true when the input is truthy', () => {
      const input = 1;
      const result = dbUtil.checkResponse(input, '');

      expect(result).toBe(true);
    });

    it('should return false and log the error message when the input is falsy', () => {
      const input = 0;
      const message = 'Ask not for who the bell tolls';
      const result = dbUtil.checkResponse(input, message);

      // TODO: test that logging service is called
      expect(result).toBe(false);
    });
  });

  describe('query', () => {
    it('should return an object with the same fields and an "active" field', () => {
      const query = dbUtil.query({id: 5});

      expect(query).toHaveProperty('id', 5);
      expect(query).toHaveProperty('active', true);
    })
  });
});