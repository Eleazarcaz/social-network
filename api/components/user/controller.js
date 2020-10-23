const TABLE = "user";

module.exports = function (includeStore) {
  const store = includeStore || require("../../../store/dummy");

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function add(data) {
    return store.upsert(TABLE, data);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function update(id, data) {
    return store.update(TABLE, id, data);
  }

  return { list, get, add, update, remove };
};
