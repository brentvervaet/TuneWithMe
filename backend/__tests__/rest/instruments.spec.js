const { tables } = require('../../src/data');
const { withServer, loginAdmin } = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');

const data = {
  instruments: [
    { id: 1, name: 'Guitar', type: 'String' },
    { id: 2, name: 'Piano', type: 'Percussion' },
    { id: 3, name: 'Violin', type: 'String' },
  ],
};

const dataToDelete = {
  instruments: [1, 2, 3],
};

describe('Instruments', () => {
  let request, knex, authHeader;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeader = await loginAdmin(request);
  });

  const url = '/api/instruments';

  //GET INSTRUMENTS
  describe('GET /api/instruments', () => {
    beforeAll(async () => {
      await knex(tables.instrument).insert(data.instruments);
    });

    afterAll(async () => {
      await knex(tables.instrument)
        .whereIn('id', dataToDelete.instruments)
        .delete();
    });

    it('should return 200 and all instruments', async () => {
      const response = await request.get(url).set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(3);

      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            name: 'Guitar',
            type: 'String',
          },
          {
            id: 3,
            name: 'Violin',
            type: 'String',
          },
        ]),
      );
    });

    it('should return 400 when given an invalid argument', async () => {
      const response = await request
        .get(`${url}?invalid=true`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });

    testAuthHeader(() => request.get(url));
  });

  describe('GET /api/instruments/:id', () => {
    beforeAll(async () => {
      await knex(tables.instrument).insert(data.instruments[0]);
    });

    afterAll(async () => {
      await knex(tables.instrument)
        .whereIn('id', dataToDelete.instruments)
        .delete();
    });

    it('should 200 and return the requested instrument', async () => {
      const response = await request
        .get(`${url}/1`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Guitar',
        type: 'String',
      });
    });

    it('should 404 when requesting not existing instrument', async () => {
      const response = await request
        .get(`${url}/2`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No instrument with id 2 exists',
        details: {
          id: 2,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 with invalid instrument id', async () => {
      const response = await request
        .get(`${url}/invalid`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    testAuthHeader(() => request.get(`${url}/1`));
  });

  describe('POST /api/instruments', () => {
    const instrumentsToDelete = [];

    afterAll(async () => {
      await knex(tables.instrument).whereIn('id', instrumentsToDelete).delete();
    });

    it('should 201 and return the created instrument', async () => {
      const response = await request
        .post(url)
        .set('Authorization', authHeader)
        .send({
          name: 'New instrument',
          type: 'String',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('New instrument');
      expect(response.body.type).toBe('String');

      instrumentsToDelete.push(response.body.id);
    });

    it('should 400 when missing name', async () => {
      const response = await request
        .post(url)
        .set('Authorization', authHeader)
        .send({
          type: 'String',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('name');
    });

    testAuthHeader(() => request.post(url));
  });

  describe('PUT /api/instruments/:id', () => {
    beforeAll(async () => {
      await knex(tables.instrument).insert(data.instruments);
    });

    afterAll(async () => {
      await knex(tables.instrument)
        .whereIn('id', dataToDelete.instruments)
        .delete();
    });

    it('should 200 and return the updated instrument', async () => {
      const response = await request
        .put(`${url}/1`)
        .set('Authorization', authHeader)
        .send({
          name: 'Changed name',
          type: 'Changed type',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Changed name',
        type: 'Changed type',
      });
    });

    it('should 400 for duplicate instrument name', async () => {
      const response = await request
        .put(`${url}/2`)
        .set('Authorization', authHeader)
        .send({
          name: 'Changed name',
          type: 'Changed type',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({
        code: 'VALIDATION_FAILED',
        message: 'A instrument with this name already exists',
        details: {},
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 when missing name', async () => {
      const response = await request
        .put(`${url}/1`)
        .set('Authorization', authHeader)
        .send({
          type: 'The type',
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('name');
    });

    testAuthHeader(() => request.put(`${url}/1`));
  });

  describe('DELETE /api/instruments/:id', () => {
    beforeAll(async () => {
      await knex(tables.instrument).insert(data.instruments[0]);
    });

    it('should 204 and return nothing', async () => {
      const response = await request
        .delete(`${url}/1`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 with not existing instrument', async () => {
      const response = await request
        .delete(`${url}/1`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No instrument with id 1 exists',
        details: {
          id: 1,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });

    // it('should 403 with not authorized', async () => {
    //   authHeader = await login(request);
    //   const response = await request
    //     .delete(`${url}/1`)
    //     .set('Authorization', authHeader);

    //   expect(response.statusCode).toBe(403);
    //   expect(response.body).toMatchObject({
    //     code: 'FORBIDDEN',
    //     message: 'You are not allowed to view this part of the application',
    //     details: {},
    //   });
    //   expect(response.body.stack).toBeTruthy();
    // });

    it('should 400 with invalid instrument id', async () => {
      const response = await request
        .get(`${url}/invalid`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    testAuthHeader(() => request.delete(`${url}/1`));
  });
});
