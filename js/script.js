// This is the main Polygon class. This is the generic shape class which function as
// a base
class Polygon {

    constructor(numberOfSides, ...sidesLength) {
        this.numberOfSides = numberOfSides;
        this.sidesLength = sidesLength;
    }

    getNumberOfSides() {
        return this.numberOfSides;
    }

    getSidesLength() {
        return this.sidesLength;
    }

    static create(numberSides, ...sidesLength) {
        return new Polygon(numberSides, ...sidesLength);
    }
}

// This is one child of the Polygon class only for Triangles.
class Triangle extends Polygon{

    getTriangleType() {
        if (this.sidesLength.length === 3) {
            if (this.sidesLength[0] === this.sidesLength[1] && this.sidesLength[1] === this.sidesLength[2]) {
                return 'equilateral';
            } else if (this.sidesLength[0] === this.sidesLength[1] || this.sidesLength[1] === this.sidesLength[2] ||
                this.sidesLength[0] === this.sidesLength[2]) {
                return 'isosceles';
            } else {
                return 'scalene';
            }
        }
    }

    static create(...sidesLength) {
        return new Triangle(3, ...sidesLength);
    }
}

// This function draws the triangle on the given canvas
function drawTriangleOnCanvas(canvas, triangle) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        let Side1 = triangle.getSidesLength()[0];
        let Side2 = triangle.getSidesLength()[1];
        let Side3 = triangle.getSidesLength()[2];

        var Ax = 0, Ay = 0;
        var Bx = Side3, By = 0;
        var Cx = (Side2 * Side1 + Side3 * Side3 - Side1 * Side1) / (2 * Side3);
        var Cy = Math.sqrt(Side2 * Side2 - Cx * Cx);

        var Ox = canvas.width / 2 - Bx / 2;
        var Oy = canvas.height / 2 + Cy / 2;

        ctx.beginPath();
        ctx.moveTo(Ox + Ax, Oy - Ay);
        ctx.lineTo(Ox + Bx, Oy - By);
        ctx.lineTo(Ox + Cx, Oy - Cy);
        ctx.closePath();
        ctx.fillStyle = 'gold';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();
    } catch (error) {
        console.log('An error occurred: ' + error);
    }
}

// This is the main function. It draws the triangle using drawTriangleOnCanvas()
// calculates the type of triangle(isosceles, equilateral, scalene) and prints it
// to the user
function calculateTriangleType() {
    let side1 = parseFloat(document.getElementById('inputField1').value);
    let side2 = parseFloat(document.getElementById('inputField2').value);
    let side3 = parseFloat(document.getElementById('inputField3').value);

    let myTriangle = Triangle.create(side1, side2, side3);

    drawTriangleOnCanvas(canvas, myTriangle);

    document.getElementById('triangleResults').textContent = myTriangle.getTriangleType();
}

let tr = Triangle.create(150,140,100);

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
// detecting the width of the window

const canvas = document.getElementById('triangle-canvas');

canvas.width = windowWidth; // 100% of width
canvas.height = windowHeight / 5; // 20% of height
// setting the width and the height of canvas

drawTriangleOnCanvas(canvas, tr);

ts.ui.ready(function() {
    console.log('UI');
});