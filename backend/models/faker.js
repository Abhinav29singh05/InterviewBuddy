const { faker } = require('@faker-js/faker');
const User = require('../schema/user.js');

function createRandomUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

async function generateUsers(count = 5) {
    try {
      const users = faker.helpers.multiple(createRandomUser, {
        count: count,
      });
      await User.deleteMany({});
      const savedUsers = await User.create(users);
      console.log(`Successfully created ${savedUsers.length} users`);
      return savedUsers;
    } catch (error) {
      console.error('Error generating users:', error);
      throw error;
    }
}
  
module.exports = { generateUsers, createRandomUser };