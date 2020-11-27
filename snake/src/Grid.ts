interface GridConstructor {
  width: number; 
  height: number;
  fill?: string;
}

interface GridItem {
  name: string;
  value: string;
  x: number;
  y: number;
}

export default class Grid {
  private height: number;
  private width: number;
  private fill: string;
  private items: GridItem[];

  public layout: string[][];
  
  constructor({
    width,
    height,
    fill = ' ',
  }: GridConstructor) {
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.layout = this.generateLayout();
    this.items = [];
  }

  public addItem(item: GridItem) {
    this.layout[item.y][item.x] = item.value;
    this.items.push(item);
  }

  public moveItem(name: string, x: number, y: number) {
    const item = this.getItemByName(name);
    if (item) {
      this.layout[item.y][item.x] = this.layout[item.y + y][item.x + x];
      this.layout[item.y + y][item.x + x] = item.value;
      item.x = item.x + x;
      item.y = item.y + y;
    }
  }

  private getItemByName(name: string) {
    return this.items.find((item: GridItem) => item.name === name);
  }

  public generateLayout(): string[][] {
    const grid = Array(this.height).fill(null);
    return grid.map(() => Array(this.width).fill(this.fill));
  }
}