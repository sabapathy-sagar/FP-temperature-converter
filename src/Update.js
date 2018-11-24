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

const update = (msg, model) => {
  switch (msg.type) {
    case MSGS.SET_LEFT_VALUE:
      const { leftValue } = msg;
      return {
        ...model,
        leftValue
      };
    case MSGS.SET_RIGHT_VALUE:
      const { rightValue } = msg;
      return {
        ...model,
        rightValue
      };
    default:
      return model;
  }
};

export default update;
