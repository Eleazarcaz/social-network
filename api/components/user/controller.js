const { nanoid } = require('nanoid');
const auth = require('../auth/index');

const TABLE = 'user';

module.exports = function(includeStore) {
  const store = includeStore || require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function add({ id, username, password, name }) {
    const user = {
      id: id || nanoid(),
      username: username || null,
      password: password || null,
      name,
    };

    if (password || username) {
      await auth.upsert(user);
    }

    return store.upsert(TABLE, user);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function update(id, data) {
    return store.update(TABLE, id, data);
  }

  return { list, get, add, update, remove };
};
