const router = require('express').Router();
const {
  create,
  get,
} = require('../service/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;
    const data = await create({ name, email, walletAddress });
    return res.status(200).json(data);
  } catch (e) {
    return res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const data = await get(walletAddress);
    return res.status(200).json(data);
  } catch (e) {
    return res.sendStatus(500);
  }
};

router.route('/').post(createUser);
router.route('/:walletAddress').get(getUser);
module.exports = router;
