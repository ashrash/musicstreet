const router = require('express').Router();
const { mint, store, getCollection } = require('../service/nftService');

const mintNFT = async (req, res) => {
  try {
    const { contractAddress, metaDataURL } = req.body;
    const data = await mint(contractAddress, metaDataURL);
    return res.status(200).json(data);
  } catch (e) {
    return res.sendStatus(500);
  }
};

const storeNFT = async (req, res) => {
  try {
    const { file } = req.body;
    const data = await store(file);
    return res.status(200).json(data);
  } catch (e) {
    return res.sendStatus(500);
  }
};

const getAllNFTByOwner = async (req, res) => {
  try {
    const { owner } = req.params;
    const data = await getCollection(owner);
    return res.status(200).json(data);
  } catch (e) {
    return res.sendStatus(500);
  }
};

router.route('/:owner').get(getAllNFTByOwner);
router.route('/mint').post(mintNFT);
router.route('/store').post(storeNFT);
module.exports = router;
