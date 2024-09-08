import { ClientEvents } from "discord.js-selfbot-v13";

export interface IEvent {
  event: keyof ClientEvents;
  once: boolean;
  handle(...args: any[]): Promise<void>;
}
