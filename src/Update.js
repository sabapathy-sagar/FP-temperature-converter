import * as R from "rambda";

const MSGS = {
  SET_LEFT_VALUE: "SET_LEFT_VALUE",
  SET_RIGHT_VALUE: "SET_RIGHT_VALUE",
  SET_LEFT_UNIT: "SET_LEFT_UNIT",
  SET_RIGHT_UNIT: "SET_RIGHT_UNIT"
};

export const setLeftValue = leftValue => {
  return {
    type: MSGS.SET_LEFT_VALUE,
    leftValue
  };
};

export const setRightValue = rightValue => {
  return {
    type: MSGS.SET_RIGHT_VALUE,
    rightValue
  };
};

export const setLeftUnit = leftUnit => {
  return {
    type: MSGS.SET_LEFT_UNIT,
    leftUnit
  };
};

export const setRightUnit = rightUnit => {
  return {
    type: MSGS.SET_RIGHT_UNIT,
    rightUnit
  };
};

//a helper function to convert strings to integer
//if str is falsy then return 0 as the default
const toInt = str =>
  R.pipe(
    parseInt,
    R.defaultTo(0)
  )(str);

const update = (msg, model) => {
  switch (msg.type) {
    case MSGS.SET_LEFT_VALUE:
      if (msg.leftValue === "") {
        return { ...model, sourceLeft: true, leftValue: "", rightValue: "" };
      }
      const leftValue = toInt(msg.leftValue);
      const { leftUnit, rightUnit } = model;
      const rightValueConverted = calculateValue(
        leftValue,
        leftUnit,
        rightUnit
      );
      return {
        ...model,
        leftValue,
        rightValue: rightValueConverted,
        sourceLeft: true
      };
    case MSGS.SET_RIGHT_VALUE:
      if (msg.rightValue === "") {
        return { ...model, sourceLeft: false, leftValue: "", rightValue: "" };
      }
      const rightValue = toInt(msg.rightValue);

      const leftValueConverted = calculateValue(
        rightValue,
        model.rightUnit,
        model.leftUnit
      );
      return {
        ...model,
        leftValue: leftValueConverted,
        rightValue,
        sourceLeft: false
      };
    case MSGS.SET_LEFT_UNIT:
      const currentLeftUnit = msg.leftUnit;
      const calculatedRightValue = calculateValue(
        model.leftValue,
        currentLeftUnit,
        model.rightUnit
      );
      return {
        ...model,
        rightValue: calculatedRightValue,
        leftUnit: currentLeftUnit
      };
    case MSGS.SET_RIGHT_UNIT:
      const currentRightUnit = msg.rightUnit;
      const calculatedLeftValue = calculateValue(
        model.rightValue,
        currentRightUnit,
        model.leftUnit
      );
      return {
        ...model,
        leftValue: calculatedLeftValue,
        rightUnit: currentRightUnit
      };
    default:
      return model;
  }
};

const calculateValue = (inputVal, from, to) => {
  if (from === to) {
    return inputVal;
  }
  switch (from) {
    case "Celsius":
      if (to === "Fahrenheit") {
        return inputVal + 32;
      } else if (to === "Kelvin") {
        return inputVal + 273.15;
      }
    case "Fahrenheit":
      if (to === "Celsius") {
        return inputVal - 32;
      } else if (to === "Kelvin") {
        return inputVal - 32 + 273.15;
      }
    case "Kelvin":
      if (to === "Celsius") {
        return inputVal - 273.15;
      } else if (to === "Fahrenheit") {
        return inputVal - 273.15 + 32;
      }
    default:
      return 0;
  }
};

export default update;
