import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

//the pre function creates the pre tag which is used for
//preformatted text
const { pre, div, h1 } = hh(h);

const view = (dispatch, model) =>
  div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
    pre(JSON.stringify(model, null, 2))
  ]);

export default view;
