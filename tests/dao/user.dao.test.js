const Fastify = require('fastify');
const userRepository = require('../../src/dao/user.dao');
const dbPlugin = require('../../src/plugin/database');

let app;

describe('User Repository', () => {
  beforeAll(async () => {
    app = Fastify();
    app.register(dbPlugin);

    await app.ready();
  });

  beforeEach(async () => {
    await app.db.query('delete from users');
  });

  it('should save user in db', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
      password: 'password',
      email: 'email',
    };

    const { saveUser } = userRepository(app.db);

    const userId = await saveUser(user);
    expect(userId).toBeDefined();
  });

  it('should throw error when required field is not present', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
    };

    const { saveUser } = userRepository(app.db);

    await expect(saveUser(user)).rejects.toThrow(Error('Not valid user data'));
  });

  it('should return user id when userId is exist in db', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
      password: 'password',
      email: 'email',
    };

    const { saveUser, getUserById } = userRepository(app.db);
    const userId = await saveUser(user);

    const dbUser = await getUserById(userId);

    expect(dbUser.first_name).toEqual('peter');
  });

  it('should throw exception when user does not exist', async () => {
    const { getUserById } = userRepository(app.db);
    await expect(
      getUserById('934d6828-74c0-4e7e-9175-90c3611dc15d')
    ).rejects.toThrow('934d6828-74c0-4e7e-9175-90c3611dc15d does not exist');
  });
});
