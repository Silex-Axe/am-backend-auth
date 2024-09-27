import request from 'supertest';
import app from '../src/server'; // Assuming your Express app is exported from `server.ts`

describe('Auth Controller', () => {
  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created');
  });

  it('should login the user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});