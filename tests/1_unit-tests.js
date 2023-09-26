const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("correctly read a whole number input", function () {
    assert.strictEqual(convertHandler.getNum("5L"), 5);
  });
  test("correctly read a decimal number input", function () {
    assert.strictEqual(convertHandler.getNum("5.5L"), 5.5);
  });
  test("correctly read a fractional input", function () {
    assert.strictEqual(convertHandler.getNum("1/2L"), 0.5);
  });
  test("correctly read a fractional input with a decimal", function () {
    assert.strictEqual(convertHandler.getNum("6.5/2L"), 3.25);
  });
  test("correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
    assert.strictEqual(convertHandler.getNum("5/5/5L"), "invalid number");
  });
  test("correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    assert.strictEqual(convertHandler.getNum("L"), 1);
  });
  test("correctly read each valid input unit.", function () {
    let inputUnit = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG",
    ];
    let outputUnit = [
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
    ];
    inputUnit.forEach((ele, index) => {
      assert.strictEqual(convertHandler.getUnit(ele), outputUnit[index]);
    });
  });
  test("correctly return an error for an invalid input unit.", function () {
    assert.strictEqual(convertHandler.getUnit("kilograms"), "invalid unit");
  });
  test("return the correct return unit for each valid input unit.", function () {
    let inputUnit = ["gal", "L", "mi", "km", "lbs", "kg"];
    let outputUnit = ["L", "gal", "km", "mi", "kg", "lbs"];
    inputUnit.forEach((ele, index) => {
      assert.strictEqual(convertHandler.getReturnUnit(ele), outputUnit[index]);
    });
  });
  test("correctly return the spelled-out string unit for each valid input unit.", function () {
    let inputUnit = ["gal", "L", "mi", "km", "lbs", "kg"];
    let outputUnit = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    inputUnit.forEach((ele, index) => {
      assert.strictEqual(convertHandler.spellOutUnit(ele), outputUnit[index]);
    });
  });
  test("correctly convert gal to L.", function () {
    assert.strictEqual(convertHandler.convert(5, "gal"), "18.92705");
  });
  test("correctly convert L to gal.", function () {
    assert.strictEqual(convertHandler.convert(5, "L"), "1.32086");
  });
  test("correctly convert mi to km.", function () {
    assert.strictEqual(convertHandler.convert(5, "mi"), "8.04670");
  });
  test("correctly convert km to mi.", function () {
    assert.strictEqual(convertHandler.convert(5, "km"), "3.10686");
  });
  test("correctly convert lbs to kg.", function () {
    assert.strictEqual(convertHandler.convert(5, "lbs"), "2.26796");
  });
  test("correctly convert kg to lbs.", function () {
    assert.strictEqual(convertHandler.convert(5, "kg"), "11.02312");
  });
});
