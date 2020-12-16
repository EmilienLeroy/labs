import Game from "./Game";
import Grid from "./Grid";
import { getRandomInt } from "./utils";

type SnakeDirection = 'left' | 'right' | 'up' | 'down';

export default class Snake extends Game {
  private grid: Grid;
  private speed: number = 50; 
  private direction: SnakeDirection = 'right';
  private score: number = 0;
  private snakeLength: number = 1;
  private snakeFill: string = '▀';

  constructor() {
    super();
    this.grid = new Grid({ width: 50, height: 20, border: true });
    this.grid.addItem({ id: 0, name: 'point', value: '*', ...this.getRandomPointPos()});
    this.grid.addItem({ 
      id: this.snakeLength, 
      name: 'snake', 
      value: this.snakeFill, 
      x: 0, 
      y: 0, 
      follow: true 
    });
    
    setInterval(this.move.bind(this), this.speed);
  }

  private get snakeHead() {
    return this.grid.getItemById(1)!;
  }

  private get snakeEnd() {
    return this.grid.getItemById(this.snakeLength)!;
  }

  private get point() {
    return this.grid.getItemByName('point')!;
  }

  protected onFrame() {

    if (this.snakeHead.x === this.point.x && this.snakeHead.y === this.point.y) {
      this.onCollision();
    }

    this.write(`Score: ${this.score} \n`);
    this.writeGrid(this.grid);
  }

  private getRandomPointPos() {
    const { width, height } = this.grid.length;
    return {
      x: getRandomInt(1, width),
      y: getRandomInt(1, height), 
    };
  }

  private onCollision() {
    this.grid.addItem({
      id: this.snakeLength + 1,
      name: `snake-${this.snakeLength + 1}`,
      value: this.snakeFill,
      x: this.snakeEnd.x - 1,
      y: this.snakeEnd.y - 1,
    });

    this.grid.updateItem(0, this.getRandomPointPos());
    this.snakeLength ++;
    this.score ++;
  }

  private move() {
    switch (this.direction) {
      case 'right':
        return this.moveSnake(1, 0);
      
      case 'left':
        return this.moveSnake(-1, 0);
        
      case 'up':
        return this.moveSnake(0, -1);

      case 'down':
        return this.moveSnake(0, 1);
    }
  }

  public moveSnake(x: number, y: number) {
    for (let index = 1; index <= this.snakeLength; index ++) {
      const previousSnake = this.grid.getItemById(index - 1);
      if (index === 1) {
        this.grid.updateItem(index, {
          x: this.snakeHead.x + x,
          y: this.snakeHead.y + y
        }, this.snakeLength === index);
      } else if (previousSnake && index !== 1) {
        this.grid.updateItem(index, {
          x: previousSnake.x, 
          y: previousSnake.y
        }, this.snakeLength === index);
      }
      
    }
  }

  protected onKeypress(str: any, key: any) {
    if (['right', 'left', 'up', 'down'].includes(key.name)) {
      this.direction = key.name;
    }
  }
}