const db = {
  user: [{ id: "1", name: "Eleazar" }],
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  let col = await list(table);
  const data = col.filter((item) => item.id === id)[0] || null;

  if (!data) {
    throw `'${id}' not found`;
  }

  return data;
}

async function upsert(table, data) {
  const newData = { id: new Date().getTime().toString(), ...data };

  db[table].push(newData);
  return get(table, newData.id);
}

async function update(table, id, data) {
  const index = db[table].findIndex((item) => item.id === id);

  if (index < 0) {
    throw `'${id}' not found`;
  }

  const newData = { id, ...data };

  db[table].splice(index, 1, newData);

  return get(table, newData.id);
}

async function remove(table, id) {
  const index = db[table].findIndex((item) => item.id === id);

  if (index < 0) {
    throw `'${id}' not found`;
  }

  db[table].splice(index, 1);

  return "removed";
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  update,
};
