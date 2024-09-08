import ExtendedClient from "./structure/Client";
import loadConfig from "./util/configUtil";

async function main() {
  // Load the config
  const config = loadConfig("../../config.toml");

  // Create the client and bind the config
  const client = new ExtendedClient();
  client.config = config;

  await client.login(config.token);
}

main().catch(console.error);
