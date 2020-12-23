const bcrypt = require("bcrypt");
const auth = require("../../../auth/index");
const error = require("../../../utils/error");

const TABLE = "auth";

module.exports = function (includeStore) {
  const store = includeStore || require("../../../store/dummy");

  async function login({ email, password }) {
    const data = await store.query(TABLE, { email });

    return bcrypt.compare(password, data.password).then((isSame) => {
      if (isSame) {
        return auth.sign({id: data.user_id, email: data.email});
      } else {
        throw error("Invalid credencials", 400);
      }
    });
  }

  async function insert({ email, password, id }) {
    const authData = {
      user_id: id,
      email,
      password: await bcrypt.hash(password, 5),
    };

    return store.insert(TABLE, authData);
  }

  return { login, insert };
};
