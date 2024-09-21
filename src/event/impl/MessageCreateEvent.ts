import ExtendedClient from "../../structure/Client";
import { IEvent } from "../IEvent";
import { ClientEvents, Message } from "discord.js-selfbot-v13";
import { Logger, ILogObj } from "tslog";
import { IModule } from "../../module/IModule";
import { TikTokReplacement } from "../../module/impl/TikTokReplacement";
import { TwitterReplacement } from "../../module/impl/TwitterReplacement";
import { RedditReplacement } from "../../module/impl/RedditReplacement";
import { URLTrackingRemoval } from "../../module/impl/URLTrackingRemoval";

export const logger: Logger<ILogObj> = new Logger();

export class MessageCreateEvent implements IEvent {
  public event: keyof ClientEvents = "messageCreate";
  public once: boolean = false;

  private modules: IModule[] = [
    new TikTokReplacement(this.client),
    new TwitterReplacement(this.client),
    new RedditReplacement(this.client),
    new URLTrackingRemoval(this.client),
  ];

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    // Ignore messages from other users
    if (message.author.id !== this.client.user?.id) {
      return;
    }

    // Using prefix as a blacklist for modules
    if (message.content.startsWith(this.client.config!.ignorePrefix)) {
      logger.debug("Not handling %s", message.content);
      message.content = message.content.slice(2);
      await message.edit(message.content);
      return;
    }

    // Process the message with the modules
    let startContent = message.content;
    for (const module of this.modules) {
      if (module.regex.test(message.content)) {
        logger.debug(
          "Handling %s with module %s",
          message.content,
          module.name,
        );

        // Process the message with the module
        message.content = await module.handle(message);
      }
    }

    // Update the message content if it has changed
    if (startContent !== message.content) {
      logger.debug(
        "Updating message content from %s to %s",
        startContent,
        message.content,
      );
      await message.edit(message.content);
    }
  }
}
