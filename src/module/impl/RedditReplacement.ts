import ExtendedClient from "../../structure/Client";
import {IModule} from "../IModule";
import {Message} from "discord.js-selfbot-v13";
import {ILogObj, Logger} from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class RedditReplacement implements IModule {
  public name = "reddit_replacement";
  public regex =
    /https:\/\/(?:www\.)?reddit\.com\/r\/[a-zA-Z0-9_]+\/comments\/([a-zA-Z0-9_]+)\/[a-zA-Z0-9_]+/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    // Replace the Reddit links with the embed provider
    return message.content.replace(this.regex, (match, postId) => {
      const replacement = `${this.client.config!.reddit.embedProvider}/r/${postId}`;
      logger.debug("%s -> %s", match, replacement);
      return replacement;
    });
  }
}
