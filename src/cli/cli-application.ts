import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandsList: Command[]): void {
    commandsList.forEach((command) => {
      const commandName: string = command.getName();
      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered.`);
      }
      this.commands[commandName] = command;
    });
  }
}
