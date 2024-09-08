import ExtendedClient from "../../structure/Client";
import {IModule} from "../IModule";
import {Message} from "discord.js-selfbot-v13";
import {ILogObj, Logger} from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class TiktokReplacement implements IModule {
  public name = "tiktok_replacement";
  // TODO: This is from https://github.com/okdargy/fxTikTok
  public regex =
    /https:\/\/www\.tiktok\.com\/@([\w_.]+)\/(video|photo|live)\/(\d{19})/g;

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    // Replace the Tiktok links with the embed provider
    return message.content.replace(
      this.regex,
      (match, username, type, id) => {
        const replacement = `${this.client.config!.tiktok.embedProvider}/@${username}/${type}/${id}`;
        logger.debug("%s -> %s", match, replacement);
        return replacement;
      },
    );
  }
}
