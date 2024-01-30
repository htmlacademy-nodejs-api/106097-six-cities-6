import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

type PackageJSONConfig = {
  version: string;
}

const isPackageJSONConfig = (value: unknown): value is PackageJSONConfig =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, 'version');

export class VersionCommand implements Command {
  constructor (
    private readonly filePath: string = '../package.json'
  ) {}

  public getName(): string {
    return '--version';
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);
    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }
    return importedContent.version;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      getErrorMessage(error);
    }
  }
}
