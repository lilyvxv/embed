import { Message } from "discord.js-selfbot-v13";

export interface IModule {
  name: string;
  regex: RegExp;
  handle(message: Message): Promise<string>;
}
