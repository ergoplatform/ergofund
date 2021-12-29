import express from 'express';
var router = express.Router();
import { getControlBox } from '../controllers/info';

router.get('/', async function(req, res, next) {
  const controlBox = await getControlBox();
  const tokensaleBox = await getTokensaleBox();
  const tokensaleBoxNFT = tokensaleBox.assets.filter(token => token.index == 0)[0]

  res.json({
    "controlBoxNFT": controlBox.assets[0].tokenId,
    "tokenSaleNFT": tokensaleBoxNFT.tokenId,
    "campaignRegistrationPrice": controlBox.additionalRegisters.R4,
    "campaignRegistrationPayToAddress": controlBox.additionalRegisters.R5
  });
});

export default router;