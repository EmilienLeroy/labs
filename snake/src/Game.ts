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
    const [ widthOffset, heightOffset ] = this.getItemOffset(grid);
    grid.layout.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (
          width > colIndex && height > rowIndex + 1 && widthOffset <= colIndex && heightOffset <= rowIndex ||
          width <= colIndex && height > rowIndex + 1 && widthOffset > colIndex - width ||
          width > colIndex && height < rowIndex + 1 && heightOffset > rowIndex - height
        ) {                   
          this.write(col);
        } else {
          this.stdout.clearLine(1);
        }
      });

      if (
        height > rowIndex + 1 && heightOffset <= rowIndex ||
        height < rowIndex + 1 && heightOffset > rowIndex - height
      ) {
        return this.write('\n');
      }
    });
  }

  protected write(data: string | Uint8Array) {
    this.stdout.write(data);
  }

  private getItemOffset(grid: Grid) {
    const [ width, height ] = this.stdout.getWindowSize();
    if(grid.itemFollow && (grid.layout.length > height || grid.layout[0].length > width)) {
      return [
        Math.round(grid.itemFollow.x - width + width / 4),
        Math.round(grid.itemFollow.y - height + height / 4)
      ];
    }

    return [0, 0];
  }
}