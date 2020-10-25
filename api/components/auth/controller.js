const auth = require('../../../auth/index');

const TABLE = 'auth';

module.exports = function(includeStore) {
  const store = includeStore || require('../../../store/dummy');

  async function login({ username, password }) {
    const data = await store.query(TABLE, { username });
    if (data.password === password) {
      debugger;
      console.log('en el if');
      return auth.sign(data);
    } else {
      throw new Error('Invalid info');
    }
  }

  function upsert({ id, username, password }) {
    const authData = { id, username, password };

    return store.upsert(TABLE, authData);
  }

  return { login, upsert };
};
