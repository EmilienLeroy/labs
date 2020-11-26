import { exit } from 'process';
import * as readline from 'readline';

export default abstract class Game {
  protected readonly fps: number;
  protected stdin: NodeJS.ReadStream & { fd: 0; };
  protected interval?: number | NodeJS.Timer;
  protected onKeypress?(str: any, key: any): void;
  protected onFrame?(): void;
  
  constructor({ fps }: { fps?: number } = {}) {
    this.fps =fps || 25;
    this.stdin = process.stdin;
  }

  public start() {
    readline.emitKeypressEvents(this.stdin);
    this.stdin.setRawMode(true);
    this.stdin.on('keypress', this.keyPress.bind(this));
    this.interval = setInterval(this.newFrame.bind(this), this.fps / 1000);
  }

  private keyPress(str: any, key: any) {
    if (key.name === 'c' && key.ctrl === true) exit(0);
    if(this.onKeypress) this.onKeypress(str, key);
  }

  private newFrame() {
    console.clear();
    if(this.onFrame) this.onFrame();
  }
}