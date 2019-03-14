const {
  clearTestUserTable,
  addNewUser,
  checkEmailExists
} = require('../users');

beforeEach(() => {
  clearTestUserTable()
})

describe('clearTestUserTable()', () => {
  test('return "Users table in shopfronttest database cleared"', async () => {
    const result = await clearTestUserTable();
    expect(result).toEqual('Successfully cleared users table in shopfronttest database')
  });
})

describe('addNewUser()', () => {
  test('adds new user to users table', async () => {
    const result = await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testuser');
    expect(result).toEqual('Successfully added new user to users table')
  });
})

describe('checkEmailExists()', () => {
  test('returns true if email is present in users table', async () => {
    await addNewUser('testuser', 'Test', 'User', 'test@user.com', 'testuser');
    const result = await checkEmailExists('test@user.com');
    expect(result).toEqual(true)
  });

  test('returns false if email is not present in users table', async () => {
    const result = await checkEmailExists('test@user.com');
    expect(result).toEqual(false)
  });
})