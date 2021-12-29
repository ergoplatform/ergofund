import config from "../config";
import { createClient } from "redis";

export async function getControlBox() {
  const redis = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`
  });
  await redis.connect();

  var controlBoxes = await redis.get('controlBox');
  controlBoxes = JSON.parse(controlBoxes);

  redis.disconnect();

  // TODO validate the control boxes in the networkScanner
  if (controlBoxes.total != 1) {
    throw new Error('Multiple control boxes found.');
  }

  return controlBoxes.items[0];
}

export async function getTokensaleBox() {
  const redis = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`
  });
  await redis.connect();

  var tokensaleBoxes = await redis.get('tokensaleBox');
  tokensaleBoxes = JSON.parse(tokensaleBoxes);

  redis.disconnect();

  // TODO validate the tokensale boxes in the networkScanner
  if (tokensaleBoxes.total != 1) {
    throw new Error('Multiple tokensale boxes found.');
  }

  return tokensaleBoxes.items[0];
}
