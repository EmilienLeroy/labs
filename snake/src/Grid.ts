interface GridConstructor {
  width: number; 
  height: number;
  fill?: string;
  border?: boolean;
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
  public border: boolean;
  
  constructor({
    width,
    height,
    fill = ' ',
    border = false,
  }: GridConstructor) {
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.border = border;
    this.layout = this.generate();
    this.items = [];
  }

  public addItem(item: GridItem) {
    item.x = this.border ? item.x + 1 : item.x;
    item.y = this.border ? item.y + 1 : item.y
    this.layout[item.y][item.x] = item.value;
    this.items.push(item);
  }

  public moveItem(name: string, x: number, y: number) {
    const item = this.getItemByName(name);
    if (item && this.layout[item.y + y] && this.layout[item.y + y][item.x + x]) {
      if(!this.isOutOfBorder({ ...item, x: item.x + x, y: item.y + y })) {
        this.layout[item.y][item.x] = this.layout[item.y + y][item.x + x];
        this.layout[item.y + y][item.x + x] = item.value;
        item.x = item.x + x;
        item.y = item.y + y;
      }
    }
  }

  private isOutOfBorder(item: GridItem) {
    return this.border && (item.y === 0 
      || item.x === 0 
      || item.y === this.layout.length - 1 
      || item.x === this.layout[item.y].length - 1);
  }

  private getItemByName(name: string) {
    return this.items.find((item: GridItem) => item.name === name);
  }

  public generate(): string[][] {
    const height = this.border ? this.height + 2 : this.height;
    const width = this.border ? this.width + 2 : this.width;
    const rows = Array<null>(height).fill(null);
    
    return rows.map((_, rowIndex) => {
      let cols = Array<string>(width).fill(this.fill);
      
      if (this.border) {
        cols = this.generateBorder(cols, rowIndex, rows.length - 1);
      }
      
      return cols;
    });
  }

  private generateBorder(cols: string[], rowIndex: number, rowLength: number) {
    return cols.map((col, colIndex) => {
      if(colIndex === 0 && rowIndex === 0) {
        return '┌';
      }

      if(rowIndex === 0 && colIndex === cols.length - 1) {
        return '┐';
      }

      if(rowIndex === rowLength && colIndex === 0) {
        return '└';
      }

      if(rowIndex === rowLength && colIndex === cols.length - 1) {
        return '┘';
      }

      if(rowIndex === 0 || rowIndex === rowLength) {
        return '─';
      }

      if(colIndex === 0 || colIndex === cols.length - 1) {
        return '│';
      }

      return col;
    });
  }
}