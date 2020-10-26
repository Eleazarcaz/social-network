const bcrypt = require('bcrypt');
const auth = require('../../../auth/index');

const TABLE = 'auth';

module.exports = function(includeStore) {
  const store = includeStore || require('../../../store/dummy');

  async function login({ username, password }) {
    const data = await store.query(TABLE, { username });

    return bcrypt.compare(password, data.password).then((isSame) => {
      if (isSame) {
        return auth.sign(data);
      } else {
        throw new Error('Invalid credencials');
      }
    });
  }

  async function upsert({ id, username, password }) {
    const authData = { id, username, password: await bcrypt.hash(password, 5) };

    return store.upsert(TABLE, authData);
  }

  return { login, upsert };
};
