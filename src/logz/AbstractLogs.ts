/**
 * Copyright 2018-2019 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */



export class AbstractLog {
  public static getInstance(): AbstractLog {
    if (!AbstractLog.instance) {
      AbstractLog.instance = new AbstractLog();
    }

    return AbstractLog.instance;
  }

  private static instance: AbstractLog;
  private logLevel: string;

  private constructor() {
    this.logLevel =
      process.env.SECONDLOCK_LOG_LEVEL === undefined ? "warning" : process.env.SECONDLOCK_LOG_LEVEL.toLocaleLowerCase();
  }

  public logMessage(_message: string | object | undefined, _level: string): void {
    switch (_level) {
      case "error":
        console.error(`${_level.toUpperCase()} \t|| ${this.getDateString()} \t|| `, this.revealPass(_message));
        break;

      case "info":
        if (this.logLevel === "info") {
          console.info(`${_level.toUpperCase()} \t|| ${this.getDateString()} \t|| `, this.revealPass(_message));
          break;
        }
        return;
      case "warning":
        if (this.logLevel === "warning" || this.logLevel === "info") {
          console.warn(`${_level.toUpperCase()} \t|| ${this.getDateString()} \t|| `, this.revealPass(_message));
          break;
        }
        return;
      default:
        console.log(`${_level.toUpperCase()} \t|| ${this.getDateString()} \t|| `, this.revealPass(_message));
        break;
    }
  }

  private getDateString(): string {
    const d = new Date();
    return `${d.toLocaleDateString("de")}:${d.toLocaleTimeString("de")}`;
  }

  private revealPass(message: any): any {
    if (Object(message).hasOwnProperty("password") || Object(message).hasOwnProperty("email")) {
      const _message = { ...message };

      if (Object(message).hasOwnProperty("password")) {
        _message.password = "*****";
      }

      if (Object(message).hasOwnProperty("email")) {
        _message.email = "*****";
      }

      return _message;
    }

    return message;
  }
}
