const { shutdownData, getKnex, tables } = require('../src/data');

// 👇 1
module.exports = async () => {
  await getKnex()(tables.tuning).delete();
  await getKnex()(tables.note).delete();
  await getKnex()(tables.user).delete();
  await getKnex()(tables.instrument).delete();

  await shutdownData();
};
