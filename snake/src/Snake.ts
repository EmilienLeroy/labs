import Game from "./Game";
import Grid from "./Grid";

export default class Snake extends Game {
  private grid: Grid;
  x: number;
  y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.grid = new Grid({ width: 50, height: 20, border: true });
    this.grid.addItem({ name: 'snake', value: '-', x: 0, y: 0, follow: true });
    this.grid.addItem({ name: 'start', value: '*', x: 25, y: 10 });
  }

  protected onFrame() {
    this.writeGrid(this.grid);
  }

  protected onKeypress(str: any, key: any) {
    switch (key.name) {
      case 'right':
        return this.grid.moveItem('snake', 1, 0);
        
      case 'left':
        return this.grid.moveItem('snake', -1, 0);
      
      case 'down':
        return this.grid.moveItem('snake', 0, 1);
      
      case 'up':
        return this.grid.moveItem('snake', 0, -1);
      
        default:
        break;
    }
  }
}