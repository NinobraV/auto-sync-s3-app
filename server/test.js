class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(length) {
    super(length, length);

    this.name = this.constructor.name; 
  }

  get area() {
    return this.height * this.width
  }

  set area(value) {
    this.area = value;
  }
}

const square = new Square(20);
square.sayName();