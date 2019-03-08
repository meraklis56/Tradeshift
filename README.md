# Tradeshift Front-End Application 2018

I was asked to create an application that is able to identify the type of a triangle depending on the length of the sides. The thoery of trigonometry says:

* **Equilateral** Triangle: all the sides have the same length
* **Isosceles** Triangle: only two sides have the same length
* **Scalene** Triangle: none of the sides have the same length

Beside the simple identification of the triangle type extra attention was given in:

## Extensibility of the algorithm: 

As it can be seen in the script.js file, the object-oriented properties of Typescript were used. More specifically, a generic class of **Polygon** was constructed, containing properties and methods that all shapes have (numberOfSides for example). Following a more specific class was constructed with name **Triangle**, based on the **Polygon** class, inheriting all the methods and properties and setting the numberOfSides = 3. 

This structure allows us to specify unique behaviour for each child class. For example, the identification of triangle type works only on Triangles(numberOfSides = 3) and not in other polygons like square(numberOfSides = 4)

## Readability of the code

## Reusability

It is crucial the code to be able to used again without many modifications. For this reason, many functions have as argument the id of the div that is going to be modified. Like errorDetection(), emptyCanvas(), drawTriangleOnCanvas(). This done only when it was possible.

## Error cases:

Extra focus was given in the input of data. It is important the given data to be valid (quantity, not containing characters, be positive, not having numerical characters like "-5-10" etc). 2 layers of error checking were implemented:

1. Creation of triangle object:

In this layer, multiple checks were done before calculating the type of triangle. More important, it is confirmed if 3 values were inserted. Next, it confirms if all the values are numbers (it doesn't matter if they are in string or number type) and not illegal phrases (for example "-5-10")

2. UI components:

In this layer, Tradeshift's input type of number was used. This allowed to elliminate any keystroke containing non-numerical value. (In addition, the error message is used to inform the user,

## Tests:

As a testing library [QUnit](https://qunitjs.com/) was used. Currently there are 8 test to evaluate the algorithm's success rate. 

## Conformance to the Tradeshift UI principles

Tradeshift's components were used to create the layout alongside with the design principles. More analytically, different layouts were implemented depending the width of the window, to identify if the device is mobile or laptop, etc.  Currently, 2 different layouts implemented (Mobile phone and rest). Also, mobile-first principle was followed.

More Tradeshify component's could be used but since the application has low complexity they were ignored. Like global-menu.

---

In addition, a small text was added in the end of .html for possible future work to enchance the quality of the application.
