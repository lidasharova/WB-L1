/*ЗАДАЧА
Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.
*/

// класс родителя
class Shape {
  constructor() {
    this.name = 'Родительский класс - ФИГУРА';
  }
  // рассчет площади
  calculateArea() {
    return 'родительский класс не имеет формулы';
  }

  // рассчет периметра
  calculatePerimeter() {
    return 'родительский класс не имеет формулы';
  }
}

// класс прямоугольника
class Rectangle extends Shape {
  constructor(width, height) {
    //в конструктор передаем параметры прямоугольника
    super(); //вызываем конструктор родительского класса ФИГУРА
    this.name = 'Прямоугольник';
    //устанавливаем переданные параметры в св-ва этого класса
    this.width = width;
    this.height = height;
  }

  //класс для расчета площади прямоугольника
  calculateArea() {
    return this.width * this.height;
  }
  //класс для рассчета периметра прямоугольника
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }
}

//класс КРУГА
class Circle extends Shape {
  constructor(radius) {
    super(); //вызываем конструктор родительского класса ФИГУРА
    this.name = 'Круг';
    this.radius = radius; //устанавливаем в с-во класса круга переданный радиус
  }

  calculateArea() {
    return Math.round(Math.PI * this.radius ** 2);
  }

  calculatePerimeter() {
    return Math.round(2 * Math.PI * this.radius);
  }
}

//класс ТРЕУГОЛЬНИКА
class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super();
    this.name = 'Треугольник';
    //устанавливаем в св-ва треугольника (три стороны) переданные в конструктор параметры (side1, side2, side3)
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  calculateArea() {
    // Используем формулу Герона для расчета площади треугольника
    const s = (this.side1 + this.side2 + this.side3) / 2;
    return Math.round(
      Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3))
    );
  }
  calculatePerimeter() {
    return this.side1 + this.side2 + this.side3;
  }
}

//Пример

const rectangle = new Rectangle(3, 8);
console.log(`S ${Rectangle.name}:`, rectangle.calculateArea()); //24
console.log(`P ${Rectangle.name}:`, rectangle.calculatePerimeter()); //22

const circle = new Circle(4);
console.log(`S ${Circle.name}:`, circle.calculateArea()); //50
console.log(`P ${Circle.name}:`, circle.calculatePerimeter()); //25

const triangle = new Triangle(3, 4, 5);
console.log(`S ${Triangle.name}:`, triangle.calculateArea()); //5
console.log(`P ${Triangle.name}:`, triangle.calculatePerimeter()); //12
