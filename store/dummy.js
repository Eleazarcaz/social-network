const db = {
  user: [{ id: '1', name: 'Eleazar' }],
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  let col = await list(table);
  const data = col.find((item) => item.id === id) || null;

  if (!data) {
    throw `'${id}' not found`;
  }

  return data;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }

  await db[table].push(data);
  const { id } = await get(table, data.id);

  return id;
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

  return 'removed';
}

async function query(table, q) {
  const col = await list(table);
  const keys = Object.keys(q);
  const key = keys[0];

  return col.find((item) => item[key] === q[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  update,
  query,
};
