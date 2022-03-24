const health = require('./health');
const nft = require('./nft');
const contract = require('./contract');

module.exports = (app) => {
  app.use('/health', health);
  app.use('/nft', nft);
  app.use('/contract', contract);
};
