const { nanoid } = require('nanoid');
const auth = require('../auth/index');

const TABLE = 'user';

module.exports = function (includeStore) {
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
      name,
    };

    if (password || username) {
      await auth.insert({ ...user, password });
    }

    return store.insert(TABLE, user);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function update(id, { username, name }) {
    return store.update(TABLE, id, { username, name });
  }

  function follow(user_to, user_from) {
    return store.insert(TABLE + '_follow', { user_from, user_to });
  }

  return { list, get, add, update, remove, follow };
};
