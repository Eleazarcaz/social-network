const bcrypt = require('bcrypt');
const TABLE = 'users';

module.exports = function (includeStore) {
  const store = includeStore || require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }

  function get(id, email) {
    const emailToString = `'${email}'`;
    return store.get(TABLE, id, emailToString);
  }

  async function add({ nickname, password, email }) {
    const passwordEncrypted = await bcrypt.hash(password, 5);
    return await store.insert(TABLE, {
      nickname,
      email,
      password: passwordEncrypted,
    });
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function update(id, { email, nickname }) {
    return store.update(TABLE, id, { email, nickname });
  }

  return { list, get, add, update, remove };
};
