const health = require('./health');
const nft = require('./nft');
const contract = require('./contract');
const user = require('./user');

module.exports = (app) => {
  app.use('/health', health);
  app.use('/nft', nft);
  app.use('/user', user);
  app.use('/contract', contract);
};
