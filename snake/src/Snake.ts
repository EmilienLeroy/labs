import Game from "./Game";

export default class Snake extends Game {
  private snake: string;

  constructor() {
    super();
    this.snake = '-';
  }

  protected onFrame() {
    this.write(this.snake);
  }

  protected onKeypress(str: any, key: any) {
    if(key.name === 'right') {
      this.snake = ' ' + this.snake;
    }

    if(key.name === 'left') {
      this.snake = this.snake.substr(1);
    }
  }
}