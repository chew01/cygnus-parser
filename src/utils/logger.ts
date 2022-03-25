/* eslint-disable no-console */
import chalk from 'chalk';

// eslint-disable-next-line no-shadow
export enum Loglevels {
    Debug,
    Info,
    Warn,
    Error,
    Fatal,
}

type colorFn = (msg: string) => string;

const prefixes = new Map<Loglevels, string>([
  [Loglevels.Debug, 'DEBUG'],
  [Loglevels.Info, 'INFO'],
  [Loglevels.Warn, 'WARN'],
  [Loglevels.Error, 'ERROR'],
  [Loglevels.Fatal, 'FATAL'],
]);

const noColor: (str: string) => string = (msg) => msg;
const colorFunctions = new Map<Loglevels, colorFn>([
  [Loglevels.Debug, chalk.gray],
  [Loglevels.Info, chalk.cyan],
  [Loglevels.Warn, chalk.yellow],
  [Loglevels.Error, (str: string) => chalk.red(str)],
  [Loglevels.Fatal, (str: string) => chalk.red.bold.italic(str)],
]);

/**
 * Create a new logger instance.
 * @param name (optional) The name of the logger instance.
 * @param logLevel The minimum level to be logged in the console. Defaults to `Loglevels.Info`.
 */
export function logger(name?: string, logLevel: Loglevels = Loglevels.Info) {
  function log(level: Loglevels, ...args: string[]) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const logLine = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || 'DEBUG'),
      name ? `${name} >` : '>',
      ...args,
    ];

    switch (level) {
      case Loglevels.Debug:
        console.debug(...logLine);
        break;
      case Loglevels.Info:
        console.info(...logLine);
        break;
      case Loglevels.Warn:
        console.warn(...logLine);
        break;
      case Loglevels.Error:
        console.error(...logLine);
        break;
      case Loglevels.Fatal:
      default:
        console.log(...logLine);
    }
  }

  function setLevel(level: Loglevels) {
    // eslint-disable-next-line no-param-reassign
    logLevel = level;
  }

  function debug(...args: string[]) {
    log(Loglevels.Debug, ...args);
  }

  function info(...args: string[]) {
    log(Loglevels.Info, ...args);
  }

  function warn(...args: string[]) {
    log(Loglevels.Warn, ...args);
  }

  function error(...args: string[]) {
    log(Loglevels.Error, ...args);
  }

  function fatal(...args: string[]) {
    log(Loglevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  };
}

export const log = logger();
export default log;
