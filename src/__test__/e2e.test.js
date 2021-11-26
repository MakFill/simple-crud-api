require('dotenv').config();
const request = require('supertest')(`http://localhost:${process.env.PORT}/`);

describe('Check REST API', () => {
  const mockPerson = {
    name: 'name',
    age: 100,
    hobbies: ['h', 'o', 'b', 'b', 'y'],
  };

  test('GET by /person', async () => {
    const res = await request.get('person');
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toEqual([]);
  });

  test('POST by /person', async () => {
    const res = await request.post('person').send(mockPerson);
    const body = JSON.parse(res.text);
    mockPerson.id = body.id;
    expect(res.status).toBe(201);
    expect(body).toEqual(mockPerson);
  });

  test('GET by /person/{personId}', async () => {
    const res = await request.get(`person/${mockPerson.id}`);
    const body = JSON.parse(res.text);

    expect(res.status).toBe(200);
    expect(body).toEqual(mockPerson);
  });

  test('PUT by /person/{personId}', async () => {
    const res = await request
      .put(`person/${mockPerson.id}`)
      .send({ name: 'test', age: mockPerson.age, hobbies: mockPerson.hobbies });
    const body = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(body).toEqual({ ...mockPerson, name: 'test' });
  });

  test('DELETE by /person/{personId}', async () => {
    const res = await request.delete(`person/${mockPerson.id}`);
    expect(res.status).toBe(204);
    expect(res.text).toBeFalsy();
  });

  test('GET by /person/{personId} where {personId} - removed object', async () => {
    const res = await request.get(`person/${mockPerson.id}`);
    expect(res.status).toBe(404);
    expect(res.text).toBe(`Person with id ${mockPerson.id} not found`);
  });
});
