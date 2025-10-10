const request = require('supertest');
const app = require('../src/server');

describe('Task Manager API Tests', () => {
  
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description'
      };
      const res = await request(app)
        .post('/api/tasks')
        .send(newTask);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(newTask.title);
    });

    it('should fail without title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title' });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
