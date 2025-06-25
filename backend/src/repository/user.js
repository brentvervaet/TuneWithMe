const { getLogger } = require('../core/logging');
const { tables, getKnex } = require('../data');
//GET
const findAll = async () => {
  return getKnex()(tables.user).select().orderBy('lastname', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
};

const findById = (id) => {
  return getKnex()(tables.user).where("id", id).first();
};

const findByEmail = async (email) => {
  return await getKnex()(tables.user).where('email', email).first();
};

//POST
const create = async ({ firstname,lastname,username, email, passwordHash, roles }) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      firstname,
      lastname,
      username,
      email,
      password_hash: passwordHash,
      roles: JSON.stringify(roles),
    });
    return id;
  } catch (err) {
    getLogger().error('Error in create', {
      err,
    });
    throw err;
  }
};
//PUT
const updateById = async (id, { username, email }) => {
  try {
    await getKnex()(tables.user).update({ username, email }).where('id', id);
    return id;
  } catch (err) {
    getLogger().error('Error in updating user', { err });
    throw err;
  }
};
//DELETE
const deleteById = async (id) => {
  try {
    getLogger().info('Deleting user by id', { id });
    const rowsAffected = await getKnex()(tables.user).delete().where('id', id);
    return rowsAffected > 0;
  } catch (err) {
    getLogger().error('Error in deleteById', { err });
    throw err;
  }
};
module.exports = {
  findAll,
  findCount,
  findById,
  findByEmail,
  create,
  updateById,
  deleteById,
};
