import Game from "./Game";
import Grid from "./Grid";

type SnakeDirection = 'left' | 'right' | 'up' | 'down';

export default class Snake extends Game {
  private grid: Grid;
  private speed: number = 50; 
  private direction: SnakeDirection = 'right';
  private score: number = 0;

  constructor() {
    super();
    this.grid = new Grid({ width: 50, height: 20, border: true });
    this.grid.addItem({ name: 'snake', value: '▀', x: 0, y: 0, follow: true });
    this.grid.addItem({ name: 'point', value: '*', ...this.getRandomPointPos()});
    setInterval(this.move.bind(this), this.speed);
  }

  protected onFrame() {
    this.write(`Score: ${this.score} \n`);
    this.writeGrid(this.grid);
  }

  private getRandomPointPos() {
    const { width, height } = this.grid.length;
    return {
      x: Math.floor(Math.random() * Math.floor(width)),
      y: Math.floor(Math.random() * Math.floor(height)), 
    };
  }

  private move() {
    switch (this.direction) {
      case 'right':
        return this.grid.moveItem('snake', 1, 0);
      
      case 'left':
        return this.grid.moveItem('snake', -1, 0);
        
      case 'up':
        return this.grid.moveItem('snake', 0, -1);

      case 'down':
        return this.grid.moveItem('snake', 0, 1);
    }
  }

  protected onKeypress(str: any, key: any) {
    if (['right', 'left', 'up', 'down'].includes(key.name)) {
      this.direction = key.name;
    }
  }
}