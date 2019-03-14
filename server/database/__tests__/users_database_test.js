const {
  clearTestUserTable,
  addNewUser,
  checkEmailExists,
  checkUsernameExists,
  checkUsernamePassword
} = require('../users');

beforeEach(async () => {
  await clearTestUserTable()
})

describe('clearTestUserTable()', () => {
  test('deletes entries in users table', async () => {
    const result = await clearTestUserTable();
    expect(result.command).toEqual('DELETE');
  });
})

describe('addNewUser()', () => {
  test('adds new user to users table', async () => {
    const result = await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testuser');
    expect(result.command).toEqual('INSERT');
  });

  test('does not add user if function is called without all arguments', async () => {
    const result = await addNewUser('testuser', 'Test', 'User', 'test@user.com');
    expect(result.command).toEqual(undefined);
  });
})

describe('checkEmailExists()', () => {
  test('returns true if email is present in users table', async () => {
    await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testuser');
    const result = await checkEmailExists('test@user.com');
    expect(result).toEqual(true);
  });

  test('returns false if email is not present in users table', async () => {
    const result = await checkEmailExists('test@user.com');
    expect(result).toEqual(false);
  });
})

describe('checkUsernameExists()', () => {
  test('returns true if email is present in users table', async () => {
    await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testuser');
    const result = await checkUsernameExists('testuser');
    expect(result).toEqual(true);
  });

  test('returns false if email is not present in users table', async () => {
    const result = await checkUsernameExists('testuser');
    expect(result).toEqual(false);
  });
})

describe('checkUsernamePassword()', () => {
  test('returns true if user exists with specified username and password', async () => {
    await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testing');
    const result = await checkUsernamePassword('testuser', 'testing');
    expect(result).toEqual(true);
  });

  test('returns false if does not exists with specified username and password', async () => {
    const result = await checkUsernamePassword('testuser', 'wrongpassword');
    expect(result).toEqual(false);
  });
})