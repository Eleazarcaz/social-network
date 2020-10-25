const TABLE = 'auth';

module.exports = function(includeStore) {
  const store = includeStore || require('../../../store/dummy');

  function upsert({ id, username, password }) {
    const authData = { id, username, password };

    return store.upsert(TABLE, authData);
  }

  return { upsert };
};
