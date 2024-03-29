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
            if (!this.sidesLength.some(isNaN)) {
                if (this.sidesLength[0] === this.sidesLength[1] && this.sidesLength[1] === this.sidesLength[2]) {
                    return 'equilateral';
                } else if (this.sidesLength[0] === this.sidesLength[1] || this.sidesLength[1] === this.sidesLength[2] ||
                    this.sidesLength[0] === this.sidesLength[2]) {
                    return 'isosceles';
                } else {
                    return 'scalene';
                }
            } else {
                return 'wrong input';
            }

        } else {
            return 'unexpected number of given sides';
        }
    }

    static create(...sidesLength) {
        return new Triangle(3, ...sidesLength);
    }
}

// This function draws the triangle on the given canvas
function drawTriangleOnCanvas(canvas, triangle) {
    let ctx = canvas.getContext('2d');
    emptyCanvas(canvas);

    try {
        let Side1 = triangle.getSidesLength()[0];
        let Side2 = triangle.getSidesLength()[1];
        let Side3 = triangle.getSidesLength()[2];

        let Ax = 0, Ay = 0;
        let Bx = Side3, By = 0;
        let Cx = (Side2 * Side1 + Side3 * Side3 - Side1 * Side1) / (2 * Side3);
        let Cy = Math.sqrt(Side2 * Side2 - Cx * Cx);

        let Ox = canvas.width / 2 - Bx / 2;
        let Oy = canvas.height / 2 + Cy / 2;

        ctx.beginPath();
        ctx.moveTo(Ox + Ax, Oy - Ay);
        ctx.lineTo(Ox + Bx, Oy - By);
        ctx.lineTo(Ox + Cx, Oy - Cy);
        ctx.closePath();
        ctx.fillStyle = 'gold';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();
        // algorithm to draw a triangle given the sides' length on a canvas
    } catch (error) {
        console.log('An error occurred: ' + error);
    }
}

// It empties the canvas
function emptyCanvas(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// This is the main function. It draws the triangle using drawTriangleOnCanvas()
// calculates the type of triangle(isosceles, equilateral, scalene) and prints it
// to the user
function calculateTriangleType(resultID) {
    let side1 = parseFloat(document.getElementById('inputField1').value);
    let side2 = parseFloat(document.getElementById('inputField2').value);
    let side3 = parseFloat(document.getElementById('inputField3').value);

    let myTriangle = Triangle.create(side1, side2, side3);

    if (errorDetection(side1, 'inputError1') && errorDetection(side2, 'inputError2') && errorDetection(side3, 'inputError3')) {
        drawTriangleOnCanvas(canvas, myTriangle);
        document.getElementById(resultID).textContent = myTriangle.getTriangleType();
    } else {
        document.getElementById(resultID).textContent = 'Error Input';
        emptyCanvas(canvas);
    }
}

// Its main responsibility is to check if the values are valid
// Values must be:
// 1. Positive
// 2. Contain valid characters only (no -) eg. "5-20"
// It must be noted that the input field doesn't accept characters by default
function errorDetection(value, errorDivID) {
    let errorDiv = document.getElementById(errorDivID);
    document.getElementById(errorDivID).innerHTML = '';
    // empties the error Div

    if (value < 0) {
        let errorDT = document.createElement('dt');
        errorDT.textContent = 'Error:';

        let errorDD = document.createElement('dd');
        errorDD.textContent = 'Only positive values are allowed';

        errorDiv.append(errorDT);
        errorDiv.append(errorDD);

        return false;
    } else if (isNaN(value)) {
        let errorDT = document.createElement('dt');
        errorDT.textContent = 'Error:';

        let errorDD = document.createElement('dd');
        errorDD.textContent = 'Invalid input';

        errorDiv.append(errorDT);
        errorDiv.append(errorDD);

        return false;
    }
    return true;
}



let tr = Triangle.create(150,140,100);

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
// detecting the width of the window

const canvas = document.getElementById('triangle-canvas');

if (windowWidth < 600) {
    canvas.width = windowWidth; // 100% of width
    canvas.height = windowHeight / 5; // 20% of height
} else {
    canvas.width = document.getElementById('shapeHolder').clientWidth;
} // setting the width and the height of canvas depending on the device's screen width

drawTriangleOnCanvas(canvas, tr);