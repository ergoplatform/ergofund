import config from "../config";
import { createClient } from "redis";

export async function getAllCampaigns(limit, offset) {
  const redis = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`
  });
  await redis.connect();

  var campaignBoxes = await redis.get('campaignBoxes');
  campaignBoxes = JSON.parse(campaignBoxes);

  redis.disconnect();

  return campaignBoxes.slice(offset, offset + limit);
}
