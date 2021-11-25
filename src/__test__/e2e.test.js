const axios = require('axios');

describe('Check REST API', () => {
  const mockPerson = {
    name: 'name',
    age: 100,
    hobbies: ['h', 'o', 'b', 'b', 'y'],
  };

  test('GET by /person', async () => {
    const res = await axios('http://localhost:4000/person');
    expect(res.status).toBe(200);
    expect(res.data).toStrictEqual([]);
  });

  test('POST by /person', async () => {
    const res = await axios('http://localhost:4000/person', {
      method: 'POST',
      data: mockPerson,
    });
    mockPerson.id = res.data.id;
    expect(res.status).toBe(201);
    expect(res.data).toEqual(mockPerson);
  });

  test('GET by /person/{personId}', async () => {
    const res = await axios(`http://localhost:4000/person/${mockPerson.id}`);
    expect(res.status).toBe(200);
    expect(res.data).toEqual(mockPerson);
  });

  test('PUT by /person/{personId}', async () => {
    const res = await axios(`http://localhost:4000/person/${mockPerson.id}`, {
      method: 'PUT',
      data: { name: 'test', age: mockPerson.age, hobbies: mockPerson.hobbies },
    });
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ...mockPerson, name: 'test' });
  });

  test('DELETE by /person/{personId}', async () => {
    const res = await axios(`http://localhost:4000/person/${mockPerson.id}`, {
      method: 'DELETE',
    });
    expect(res.status).toBe(204);
    expect(res.data).toBeFalsy();
  });

  test('GET by /person/{personId} where {personId} - removed object', async () => {
    try {
      await axios(`http://localhost:4000/person/${mockPerson.id}`);
    } catch (err) {
      expect(err.response.status).toBe(404);
      expect(err.response.data).toBe(`Person with id ${mockPerson.id} not found`);
    }
  });
});
