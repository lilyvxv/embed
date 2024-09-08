import ExtendedClient from "../../structure/Client";
import { IEvent } from "../IEvent";
import { ClientEvents } from "discord.js-selfbot-v13";
import { Logger, ILogObj } from "tslog";

export const logger: Logger<ILogObj> = new Logger();

export class ClientReadyEvent implements IEvent {
  public event: keyof ClientEvents = "ready";
  public once: boolean = true;

  constructor(private client: ExtendedClient) {}

  async handle() {
    logger.info(
      "Logged in as %s (%s)",
      this.client.user?.tag,
      this.client.user?.id,
    );
  }
}
