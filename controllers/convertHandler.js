function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let num;
    let regex = /[a-zA-Z]/;
    let index = input.search(regex);
    if (index === 0) {
      num = "1";
    } else {
      num = input.slice(0, index);
    }
    let division = num.split("/");
    if (division.length === 2) {
      result = Number(division[0]) / Number(division[1]);
    } else {
      result = Number(num);
    }
    if (!result) {
      result = "invalid number";
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    let unit = ["gal", "l", "mi", "km", "lbs", "kg"];
    let regex = /[a-zA-Z]/;
    let index = input.search(regex);
    let inputUnit = input.slice(index);
    inputUnit = inputUnit.toLowerCase();
    if (unit.includes(inputUnit)) {
      if (inputUnit === "l") {
        result = "L";
      } else {
        result = inputUnit;
      }
    } else {
      result = "invalid unit";
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    let unitHandler = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    result = unitHandler[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    let unitSpeller = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };
    result = unitSpeller[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let multiply = {
      gal: galToL,
      lbs: lbsToKg,
      mi: miToKm,
    };
    let divide = {
      L: galToL,
      kg: lbsToKg,
      km: miToKm,
    };
    if (multiply[initUnit]) {
      result = initNum * multiply[initUnit];
    }
    if (divide[initUnit]) {
      result = initNum / divide[initUnit];
    }
    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);
    return result;
  };
}

module.exports = ConvertHandler;
