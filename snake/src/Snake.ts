import Game from "./Game";

export default class Snake extends Game {
  private grid: string[][];
  x: number;
  y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.grid = this.generateGrid(10,10);
    this.grid[this.x][this.y] = '-';
    
  }

  protected onFrame() {
    this.writeGrid(this.grid);
  }

  protected onKeypress(str: any, key: any) {
    if(key.name === 'right') {
      this.grid = this.generateGrid(10,10);
      this.y++;
      this.grid[this.x][this.y] = '-';
    }

    if(key.name === 'left') {
      this.grid = this.generateGrid(10,10);
      this.y--;
      this.grid[this.x][this.y] = '-';
    }

    if(key.name === 'up') {
      this.grid = this.generateGrid(10,10);
      this.x--;
      this.grid[this.x][this.y] = '-';
    }

    if(key.name === 'down') {
      this.grid = this.generateGrid(10,10);
      this.x++;
      this.grid[this.x][this.y] = '-';
    }
  }
}