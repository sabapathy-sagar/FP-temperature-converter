import * as R from "rambda";

const MSGS = {
  SET_LEFT_VALUE: "SET_LEFT_VALUE",
  SET_RIGHT_VALUE: "SET_RIGHT_VALUE"
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
      return {
        ...model,
        leftValue,
        sourceLeft: true
      };
    case MSGS.SET_RIGHT_VALUE:
      if (msg.rightValue === "") {
        return { ...model, sourceLeft: false, leftValue: "", rightValue: "" };
      }
      const rightValue = toInt(msg.rightValue);
      return {
        ...model,
        rightValue,
        sourceLeft: false
      };
    default:
      return model;
  }
};

export default update;
