import { exit } from 'process';
import * as readline from 'readline';
import Grid from './Grid';

export default abstract class Game {
  protected readonly fps: number;
  protected stdin: NodeJS.ReadStream & { fd: 0; };
  protected interval?: number | NodeJS.Timer;
  protected stdout: NodeJS.WriteStream & { fd: 1; };
  protected onKeypress?(str: any, key: any): void;
  protected onFrame?(): void;
  
  constructor({ fps }: { fps?: number } = {}) {
    this.fps =fps || 25;
    this.stdin = process.stdin;
    this.stdout = process.stdout;

  }

  public start() {
    console.clear();
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
    readline.moveCursor(this.stdout, 0, -100);
    this.stdout.clearLine(1);
    this.stdout.cursorTo(0);
    this.write('\u001B[?25l')
    if(this.onFrame) this.onFrame();
  }

  protected writeGrid(grid: Grid) {
    grid.layout.forEach((line, yIndex) => {
      line.forEach((cursor, xIndex) => this.write(cursor));
      this.write('\n');
    });
  }

  protected write(data: string | Uint8Array) {
    this.stdout.write(data);
  }

}