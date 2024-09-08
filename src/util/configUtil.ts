import fs from "fs";
import path from "path";
import toml from "@iarna/toml";

export interface EmbedConfig {
  token: string;
  ignorePrefix: string;

  // Platform specific
  twitter: {
    download: false;
    embedProvider: string;
  };
  reddit: {
    download: false;
    embedProvider: string;
  };
  tiktok: {
    download: false;
    embedProvider: string;
  };
}

export default function loadConfig(filePath: string): EmbedConfig {
  const absolutePath = path.resolve(__dirname, filePath);
  const tomlData = fs.readFileSync(absolutePath, "utf8");
  return toml.parse(tomlData) as unknown as EmbedConfig;
}
