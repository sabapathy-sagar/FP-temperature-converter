import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "rambda";

//the pre function creates the pre tag which is used for
//preformatted text
const { pre, div, h1, input, select, option } = hh(h);

const UNITS = ["Fahrenheit", "Celsius", "Kelvin"];

const unitOptions = selectedUnit =>
  R.map(
    unit => option({ value: unit, selected: selectedUnit === unit }, unit),
    UNITS
  );

const unitSection = (dispatch, unit, value) => {
  return div({ className: "w-50 ma1" }, [
    input({
      type: "text",
      className: "db w-100 mv2 pa2 input-reset ba",
      value
    }),
    select(
      {
        classname: "db w-100 pa2 ba input-reset br1 bg-white ba b-black"
      },
      unitOptions(unit)
    )
  ]);
};

const view = (dispatch, model) =>
  div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
    div({ className: "flex" }, [
      unitSection(dispatch, model.leftUnit, model.leftValue),
      unitSection(dispatch, model.rightUnit, model.rightValue)
    ]),
    pre(JSON.stringify(model, null, 2))
  ]);

export default view;
