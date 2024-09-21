import ExtendedClient from "../../structure/Client";
import { IModule } from "../IModule";
import { Message } from "discord.js-selfbot-v13";
import { ILogObj, Logger } from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class TikTokReplacement implements IModule {
  public name = "tiktok_replacement";
  public regex =
    /(?:https?:\/\/)?(?:vm\.tiktok\.com\/|www\.tiktok\.com\/@[\w\-]+\/video\/\d+|www\.tiktok\.com\/[\w\-\/?=&]+)/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    const embedProvider = this.client.config!.tiktok.embedProvider;

    // Replace the TikTok links with the embed provider
    return message.content.replace(this.regex, (match) => {
      logger.debug("%s -> %s", match, embedProvider);
      return match.replace("tiktok.com", embedProvider);
    });
  }
}
