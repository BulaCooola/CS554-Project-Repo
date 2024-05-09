import { createClient } from "redis";

export async function getRedisClient() {
  let client = undefined;
  if (process.env.REDIS_CONNECTION === "LOCAL") {
    client = createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    return client;
  }
  if (process.env.REDIS_CONNECTION === "CLOUD") {
    client = createClient({
      password: "dabF6WDYby0CsgETBOXKs1tBXvS3ixQR",
      socket: {
        host: "redis-15251.c256.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 15251,
      },
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    return client;
  }
}
