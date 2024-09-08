import { Client, ClientOptions } from "discord.js-selfbot-v13";
import { IEvent } from "../event/IEvent";
import { ClientReadyEvent } from "../event/impl/ClientReadyEvent";
import { MessageCreateEvent } from "../event/impl/MessageCreateEvent";
import { EmbedConfig } from "../util/configUtil";

export default class ExtendedClient extends Client {
  public config: EmbedConfig | undefined;

  public events: (new (client: ExtendedClient) => IEvent)[] = [
    ClientReadyEvent,
    MessageCreateEvent,
  ];

  constructor(options: ClientOptions = {}) {
    super(options);
  }

  override async login(token?: string) {
    await this.registerEvents();
    return super.login(token);
  }

  private async registerEvents() {
    for (const Event of this.events) {
      const eventInstance = new Event(this);
      const eventName = eventInstance.event;
      const handler = eventInstance.handle.bind(eventInstance);
      if (eventInstance.once) {
        this.once(eventName, handler);
      } else {
        this.on(eventName, handler);
      }
    }
  }
}
