import ExtendedClient from "../../structure/Client";
import { IModule } from "../IModule";
import { Message } from "discord.js-selfbot-v13";
import { ILogObj, Logger } from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class RedditReplacement implements IModule {
  public name = "reddit_replacement";
  public regex = /(?:https?:\/\/)?(?:www\.)?reddit\.com\/[\w\-\/?=&]+/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    const embedProvider = this.client.config!.reddit.embedProvider;

    // Replace the Reddit links with the embed provider
    return message.content.replace(this.regex, (match) => {
      logger.debug("%s -> %s", match, embedProvider);
      return match.replace("reddit.com", embedProvider);
    });
  }
}
