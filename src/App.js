import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

//impure
const app = (initModel, update, view, node) => {
  //set the initial model (state)
  let model = initModel;
  //update the DOM with the initial state
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  //the dispatch method is called when the button is clicked
  function dispatch(msg) {
    //update the model(state) by calling the update function
    model = update(msg, model);
    //update the Dom by calling the view function
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
};

export default app;
