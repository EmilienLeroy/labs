import Game from "./Game";

export default class Snake extends Game {
  private snake: string;

  constructor() {
    super();
    this.snake = '-';
  }

  protected onFrame() {
    console.log(this.snake);
  }

  protected onKeypress(str: any, key: any) {
    if(key.name === 'right') {
      this.snake = ' ' + this.snake;
    }
  }
}