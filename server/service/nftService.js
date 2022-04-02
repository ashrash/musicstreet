/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const fs = require('fs');
const { ethers } = require('hardhat');
const axios = require('axios');
const { NFTStorage, File } = require('nft.storage');

dotenv.config();
const { NFT_STORAGE_API_KEY, ALCHEMY_KEY } = process.env;

const mint = async (contractAddress, metaDataURL) => {
  const ExampleNFT = await ethers.getContractFactory('ExampleNFT');
  const [owner] = await ethers.getSigners();
  await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL);
  console.log('NFT minted to: ', owner.address);
  return owner.address;
};

const store = async (file) => {
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store({
    name: 'ExampleNFT',
    description: 'My ExampleNFT is an awesome artwork!',
    image: new File(
      [await fs.promises.readFile('assets/MyExampleNFT.png')],
      'MyExampleNFT.png',
      { type: 'image/png' },
    ),
  });
  console.log('Metadata stored on Filecoin and IPFS with URL:', metadata.url);
  return metadata.url;
};

const getCollection = async (owner) => {
  const response = await axios.get(`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}/getNFTs?owner=${owner}`);
  const { data } = response;
  return data;
};

module.exports = {
  getCollection,
  mint,
  store,
};
