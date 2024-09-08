import ExtendedClient from "../../structure/Client";
import { IEvent } from "../IEvent";
import { ClientEvents, Message } from "discord.js-selfbot-v13";
import { Logger, ILogObj } from "tslog";
import { IModule } from "../../module/IModule";
import { TiktokReplacement } from "../../module/impl/TiktokReplacement";
import { TwitterReplacement } from "../../module/impl/TwitterReplacement";
import { RedditReplacement } from "../../module/impl/RedditReplacement";

export const logger: Logger<ILogObj> = new Logger();

export class MessageCreateEvent implements IEvent {
  public event: keyof ClientEvents = "messageCreate";
  public once: boolean = false;

  private modules: IModule[] = [
    new TiktokReplacement(this.client),
    new TwitterReplacement(this.client),
    new RedditReplacement(this.client),
  ];

  constructor(private client: ExtendedClient) {}

  async handle(message: Message) {
    // Ignore messages from other users
    if (message.author.id !== this.client.user?.id) {
      return;
    }

    // Process the message with the modules
    for (const module of this.modules) {
      if (module.regex.test(message.content)) {
        // Using prefix as a blacklist for modules
        if (message.content.startsWith(this.client.config!.ignorePrefix)) {
          logger.debug(
            "Not handling %s with module %s due to prefix",
            message.content,
            module.name,
          );
          message.content = message.content.slice(2);
          await message.edit(message.content);
          return;
        }

        logger.debug("Handling %s with module %s", message.content, module.name);

        // Process the message with the module
        await module.handle(message);
      }
    }
  }
}
