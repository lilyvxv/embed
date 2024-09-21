import ExtendedClient from "../../structure/Client";
import { IModule } from "../IModule";
import { Message } from "discord.js-selfbot-v13";
import { ILogObj, Logger } from "tslog";
import { URL } from "url";

export const logger: Logger<ILogObj> = new Logger();

export class URLTrackingRemoval implements IModule {
  public name = "url_tracking_removal";
  public regex = /https?:\/\/[^\s?]+\?\S+/g;

  constructor(private client: ExtendedClient) {}

  // TODO: Maybe target specific query parameters to remove
  async handle(message: Message) {
    // Replace URLs by removing their query parameters
    return message.content.replace(this.regex, (match) => {
      try {
        const url = new URL(match);

        // Remove specific query parameters
        for (const key of url.searchParams.keys()) {
          if (key !== "v") {
            url.searchParams.delete(key);
          }
        }

        logger.debug("Removed query parameters: %s -> %s", match, url.toString());

        return url.toString();
      } catch (error) {
        logger.error("Failed to parse URL: %s", match);
        return match;
      }
    });
  }
}
