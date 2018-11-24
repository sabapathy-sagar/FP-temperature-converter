import * as R from "rambda";

const MSGS = {
  SET_LEFT_VALUE: "SET_LEFT_VALUE"
};

export const setLeftValue = leftValue => {
  return {
    type: MSGS.SET_LEFT_VALUE,
    leftValue
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
    default:
      return model;
  }
};

export default update;
