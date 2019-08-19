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
        // tslint:disable-next-line:no-console
        console.log(`${this.getDateString()} || LogLevel: ${_level.toLocaleUpperCase()}`);
        // tslint:disable-next-line:no-console
        console.log(this.revealPass(_message));
        break;

      case "info":
        if (this.logLevel === "info") {
          // tslint:disable-next-line:no-console
          console.log(`${this.getDateString()} || LogLevel: ${_level.toUpperCase()}`);
          // tslint:disable-next-line:no-console
          console.log(this.revealPass(_message));
          break;
        }
        return;
      case "warning":
        if (this.logLevel === "warning" || this.logLevel === "info") {
          // tslint:disable-next-line:no-console
          console.log(`${this.getDateString()} || LogLevel: ${_level.toUpperCase()}`);
          // tslint:disable-next-line:no-console
          console.log(this.revealPass(_message));
          break;
        }
        return;
      default:
        // tslint:disable-next-line:no-console
        console.log(`${this.getDateString()} || LogLevel: ${_level.toUpperCase()}`);
        // tslint:disable-next-line:no-console
        console.log(this.revealPass(_message));
        break;
    }
  }

  private getDateString(): string {
    const d = new Date();
    return `${d.getFullYear()}:${d.getMonth() + 1}:${d.getDate()}::${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  private revealPass(message: any): any {
    if (typeof message === "object") {
      if (message.password) {
        message.password = "*****";
      }

      if (message.email) {
        message.email = "*****";
      }
      return message;
    }

    return message;
  }
}
