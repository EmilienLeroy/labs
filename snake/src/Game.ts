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
  protected onResize?(): void;
  
  constructor({ fps }: { fps?: number } = {}) {
    this.fps = fps || 25;
    this.stdin = process.stdin;
    this.stdout = process.stdout;
  }

  public start() {
    console.clear();
    readline.emitKeypressEvents(this.stdin);
    this.stdin.setRawMode(true);
    this.stdin.on('keypress', this.keyPress.bind(this));
    this.stdout.on('resize', this.resize.bind(this));
    this.interval = setInterval(this.newFrame.bind(this), this.fps / 1000);
  }

  private keyPress(str: any, key: any) {
    if (key.name === 'c' && key.ctrl === true) exit(0);
    if(this.onKeypress) this.onKeypress(str, key);
  }

  private newFrame() {
    this.clear();
    if(this.onFrame) this.onFrame();
  }

  private resize() {
    this.clear();
    this.stdout.clearScreenDown();
    if(this.onResize) this.onResize();
  }

  private clear() {
    const height = this.stdout.getWindowSize()[1];
    readline.moveCursor(this.stdout, 0, -height);
    this.stdout.clearLine(0);
    this.write('\u001B[?25l');
  }

  

  protected writeGrid(grid: Grid) {
    const [ width, height ] = this.stdout.getWindowSize();
    const heightOffset = grid.itemFollow ? (grid.itemFollow.y - height) + 3 : 0;
    const widthOffset = grid.itemFollow ? (grid.itemFollow.x - width) + 3 : 0;
    grid.layout.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (
            (
              width > colIndex && 
              height > rowIndex + 1 && 
              widthOffset < colIndex && 
              heightOffset < rowIndex
            ) || (
              widthOffset > 0 && 
              widthOffset + width > colIndex  && 
              height > rowIndex + 1
              )
            ) {
          this.write(col);
        }
      });

      if (height > rowIndex + 1 && heightOffset + height < rowIndex) {
        return this.write('\n');
      }
    });
  }

  protected write(data: string | Uint8Array) {
    this.stdout.write(data);
  }

}