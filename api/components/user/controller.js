const auth = require("../auth/index");

const TABLE = "users";

module.exports = function (includeStore) {
  const store = includeStore || require("../../../store/dummy");

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function add({ nickname, password, email }) {
    const userToAuth = {
      nickname,
      email,
      password,
    };

    const user = await store.insert(TABLE, {nickname, email});
    await auth.insert({...userToAuth, id: user.insertId});

    return user;
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function update(id, { email, nickname }) {
    return store.update(TABLE, id, { email, nickname });
  }

  function follow(user_to, user_from) {
    return store.insert(TABLE + "_follow", { user_from, user_to });
  }

  return { list, get, add, update, remove, follow };
};
