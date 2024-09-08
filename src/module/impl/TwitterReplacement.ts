import ExtendedClient from "../../structure/Client";
import { IModule } from "../IModule";
import { Message } from "discord.js-selfbot-v13";
import { ILogObj, Logger } from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class TwitterReplacement implements IModule {
  public name = "twitter_replacement";
  public regex =
    /https:\/\/(?:twitter\.com|x\.com)\/(?:[a-zA-Z0-9_]{1,15}\/status\/|status\/)(\d+)/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    // Replace Twitter URLs in the message content
    const newContent = message.content.replace(this.regex, (match, id) => {
      const replacement = `${this.client.config!.twitter.embedProvider}/status/${id}`;
      logger.debug("%s -> %s", match, replacement);
      return replacement;
    });

    // Edit the message with the new content
    await message.edit(newContent);
  }
}
