import config from "../config";
import { createClient } from "redis";

export async function getAllCampaigns(offset) {
  const redis = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`
  });
  await redis.connect();

  const campaignBoxes = await redis.get('campaignBoxes');

  redis.disconnect();

  return JSON.parse(campaignBoxes);
}
