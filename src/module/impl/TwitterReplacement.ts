import ExtendedClient from "../../structure/Client";
import {IModule} from "../IModule";
import {Message} from "discord.js-selfbot-v13";
import {ILogObj, Logger} from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class TwitterReplacement implements IModule {
  public name = "twitter_replacement";
  public regex = /(?:https?:\/\/)?(?:twitter\.com|x\.com)\/[\w\-\/?=&]+/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    const embedProvider = this.client.config!.twitter.embedProvider;

    // Replace the Twitter links with the embed provider
    return message.content.replace(this.regex, (match) => {
      let replaced = match.replace(/twitter\.com|x\.com/, embedProvider);
      logger.debug("%s -> %s", match, replaced);
      return replaced;
    });
  }
}
