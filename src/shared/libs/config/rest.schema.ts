export type RestSchema = {
  PORT: number;
}

export const configRestSchema = {
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  }
}
