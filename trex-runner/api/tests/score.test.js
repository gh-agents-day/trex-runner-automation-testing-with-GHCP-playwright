const request = require('supertest');
const { app, reset } = require('../server');

beforeEach(() => {
  reset();
});

describe('GET /score', () => {
  test('returns { highScore: 0 } on first call', async () => {
    const res = await request(app).get('/score');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ highScore: 0 });
  });
});

describe('POST /score/:value', () => {
  test('POST /score/100 updates highScore to 100', async () => {
    const res = await request(app).post('/score/100');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ highScore: 100 });
  });

  test('POST /score/50 after score is 100 — highScore stays at 100', async () => {
    await request(app).post('/score/100');
    const res = await request(app).post('/score/50');
    expect(res.body).toEqual({ highScore: 100 });
  });

  test('POST /score/200 after score is 100 — highScore updates to 200', async () => {
    await request(app).post('/score/100');
    const res = await request(app).post('/score/200');
    expect(res.body).toEqual({ highScore: 200 });
  });
});
